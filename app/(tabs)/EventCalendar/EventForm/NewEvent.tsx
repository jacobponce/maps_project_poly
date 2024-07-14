import {View, Text, Button, FlatList, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

const locationsDictionary: { [key: string]: { latitude: number; longitude: number } } = {
  "Business": { latitude:35.30015127563236, longitude:-120.66523106002076 },
  "Location B": { latitude: 34.052235, longitude: -118.243683 },
  "Location C": { latitude: 37.774929, longitude: -122.419418 },
  // Add more locations as needed
};

const LocationPicker = ({ onSelectLocation }: { onSelectLocation: (location: string) => void }) => {
  const [query, setQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text) {
      const filtered = Object.keys(locationsDictionary).filter((location) =>
        location.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  };

  const handleSelectLocation = (location: string) => {
    setQuery(location);
    setFilteredLocations([]);
    onSelectLocation(location);
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Select a Location:</Text>
      <TextInput
        value={query}
        onChangeText={handleSearch}
        placeholder="Search for a location"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      {filteredLocations.length > 0 && (
        <FlatList
          data={filteredLocations}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectLocation(item)}>
              <Text style={{ padding: 10 }}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const List = ({ navigation }: any) => {
  const [eventName, setEventName] = useState('');
  const [clubName, setClubName] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date()); // Added end state
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false); // Added showEndPicker state
  const router = useRouter();

  const addEvent = async () => {
    if (selectedLocation && eventName && clubName && date && start && end) {
      const coordinates = locationsDictionary[selectedLocation];
      try {
        const docRef = await addDoc(collection(FIREBASE_DB, 'events'), {
          eventName,
          clubName,
          date,
          start: start.toLocaleTimeString(),
          end: end.toLocaleTimeString(), // Added end to the database document
          location: {
            title: selectedLocation,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          },
        });
        console.log('Document written with ID: ', docRef.id);
        setEventName('');
        setClubName('');
        setDate('');
        setStart(new Date());
        setEnd(new Date()); // Reset end state
        setSelectedLocation('');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  };

  const returnBack = () => {
    router.back();
    console.log('Going to calendar...');
  };

  const handlePress = () => {
    addEvent();
    returnBack();
  };

  const isFormValid = () => {
    return eventName !== '' && clubName !== '' && selectedLocation !== '';
  };

  useEffect(() => {
    if (start){
    setDate(start.toISOString().split('T')[0]);
    }
  }, [start]);
    
  return (
    <SafeAreaView>
      <Text>Events</Text>
      <TextInput
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        placeholder="Club Name"
        value={clubName}
        onChangeText={setClubName}
      />
      <Button title="Start Date & Time" onPress={() => setShowStartPicker(true)} />
      {showStartPicker && (
        <DateTimePicker
          value={start}
          mode="datetime"
          display="default"
          minuteInterval={15}
          timeZoneName='America/Los_Angeles'
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) {
              setStart(selectedDate);
              setEnd(selectedDate); // Set end date to match start date initially
            }
          }}
        />
      )}
      <Text>Start: {start.toLocaleString()}</Text>
      <Button
        title="End Date & Time"
        onPress={() => setShowEndPicker(true)}
        disabled={!start} // Disable if start date is not set
      />
      {showEndPicker && (
        <DateTimePicker
          value={end}
          mode="datetime"
          display="default"
          minuteInterval={15}
          timeZoneName='America/Los_Angeles'
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) {
              setEnd(selectedDate);
            }
          }}
        />
      )}
      <Text>End: {end.toLocaleString()}</Text>
      <LocationPicker onSelectLocation={setSelectedLocation} />
      <Button
        title="Add Event"
        onPress={handlePress}
        disabled={!isFormValid()}
      />
    </SafeAreaView>
  );
};

export default List;