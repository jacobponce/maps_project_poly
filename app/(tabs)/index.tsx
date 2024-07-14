import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Image, Text } from 'react-native';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import useEventsList from './EventCalendar/eventsList';
import { EventType } from './EventCalendar/EventType';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

interface Location {
  title: string;
  latitude: number;
  longitude: number;
}

interface LocationOfInterest {
  eventName: string;
  clubName: string;
  date: string;
  start: string;
  end: string;
  location: Location;
}

const INITIAL_REGION = {
  latitude: 35.302894,
  longitude: -120.660,
  latitudeDelta: 0.01,
  longitudeDelta: 0.015,
};


export default function MapView1() {

  const events = useEventsList();

  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.location.title]) {
      acc[event.location.title] = [];
    }
    acc[event.location.title].push(event);
    return acc;
  }, {} as { [key: string]: LocationOfInterest[] }); // Create list of events grouped by loc

  const showLocationsOfInterest = () => {
    return Object.keys(groupedEvents).map((locationTitle, index) => {
      const events = groupedEvents[locationTitle];
      const firstEvent = events[0];
      const iconSource = require('@/assets/images/wbrawler.png');
      return (
        <Marker
          key={index}
          coordinate={firstEvent.location}
          title={firstEvent.eventName}
        >
          <Image
            source={iconSource}
            style={{ width: 50.5, height: 50 }} // Adjust the size as needed
            resizeMode="contain" // Adjust how the image fits within the bounds 
          />
          <Callout>
            <GestureHandlerRootView style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Location: {locationTitle}</Text>
              <ScrollView style={styles.scrollView}>
                {events.map((event, eventIndex) => (
                  <View key={eventIndex}>
                    <Text style={styles.calloutSubtitle}>{event.clubName} - {event.eventName}</Text>
                  </View>
                ))}
              </ScrollView>
            </GestureHandlerRootView>
          </Callout>
        </Marker>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        mapType='standard'
        userInterfaceStyle='dark'
        rotateEnabled={false}
        showsCompass={true}
        showsPointsOfInterest={false}
        showsUserLocation={true}
      >
        {showLocationsOfInterest()}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 160,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  calloutSubtitle: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
});