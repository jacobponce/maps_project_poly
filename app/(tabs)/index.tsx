import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Image, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import useEventsList from './EventCalendar/eventsList';
import { EventType } from './EventCalendar/EventType';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';

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

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

const INITIAL_REGION: Region = {
  latitude: 35.302894,
  longitude: -120.660,
  latitudeDelta: 0.01,
  longitudeDelta: 0.015,
};

const locationsDictionary: { [key: string]: { latitude: number; longitude: number } } = {
  "Business": { latitude:35.30015127563236, longitude:-120.66523106002076 },
  "Jacob House": { latitude: 35.30816, longitude: -120.65937 },
  "Location C": { latitude: 37.774929, longitude: -122.419418 },
  // Add more locations as needed
};

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
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 9999,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dropdown: {
    maxHeight: 200,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    zIndex: 9999,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  dropdownItemText: {
    fontSize: 16,
  },
});

export default function MapView1() {

  const events = useEventsList();
  const [search, setSearch] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [region, setRegion] = useState<Region>(INITIAL_REGION);


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

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (text.length > 0) {
      const filtered = Object.keys(locationsDictionary).filter(location =>
        location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleLocationSelect = (location: string) => {
    setSearch(location);
    setFilteredLocations([]);
    const selectedLocation = locationsDictionary[location];
    setRegion({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.015,
    });
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Location..."
          value={search}
          onChangeText={handleSearchChange}
        />
        {filteredLocations.length > 0 && (
          <View style={styles.dropdown}>
            <FlatList
              data={filteredLocations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleLocationSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        region={region}
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