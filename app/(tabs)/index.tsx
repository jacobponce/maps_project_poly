import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Image, Text } from 'react-native';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
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

const groupEventsByLocation = (events: LocationOfInterest[]) => {
  return events.reduce((acc, event) => {
    if (!acc[event.location.title]) {
      acc[event.location.title] = [];
    }
    acc[event.location.title].push(event);
    return acc;
  }, {} as { [key: string]: LocationOfInterest[] });
};


export default function MapView1() {
  const [locationsOfInterest, setLocationsOfInterest] = useState<LocationOfInterest[]>([]);
  const [groupedEvents, setGroupedEvents] = useState<{ [key: string]: LocationOfInterest[] }>({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'events'));
        const events = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            eventName: data.eventName,
            clubName: data.clubName,
            date: data.date,
            start: data.start,
            end: data.end,
            location: {
              title: data.location.title,
              latitude: data.location.latitude,
              longitude: data.location.longitude,
            },
          };
        });
        setLocationsOfInterest(events);
        setGroupedEvents(groupEventsByLocation(events));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [reload]); // have this event reload when the reload state changes

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Reloading map...')
      setReload(prev => !prev); // Toggle the state to trigger re-fetching
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

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