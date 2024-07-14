import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Image, Text } from 'react-native';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

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
  const [locationsOfInterest, setLocationsOfInterest] = useState<LocationOfInterest[]>([]);

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
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      const iconSource = require('@/assets/images/wbrawler.png');
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.eventName}
        >
          <Image
            source={iconSource}
            style={{ width: 50.5, height: 50 }} // Adjust the size as needed
            resizeMode="contain" // Adjust how the image fits within the bounds 
          />
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>Club: {item.clubName}</Text>
              <Text style={styles.calloutSubtitle}>Event: {item.eventName}</Text>
              <Text style={styles.calloutSubtitle}>Location: {item.location.title}</Text>
            </View>
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
});