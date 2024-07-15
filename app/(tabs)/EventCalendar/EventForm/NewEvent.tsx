import {View, Text, Button, FlatList, SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

const locationsDictionary: { [key: string]: { latitude: number; longitude: number } } = {
  "Business": { latitude:35.30015127563236, longitude:-120.66523106002076 },
  "Jacob House": { latitude: 35.30816, longitude: -120.65937 },
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
        onFocus={() => !query && setFilteredLocations(Object.keys(locationsDictionary))}
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

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const router = useRouter();

  const handleStartDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setStart(selectedDate);
      setShowStartDatePicker(false);
      setShowStartTimePicker(true); 
      setEnd(selectedDate); // Set end date to match start date initially
    }
  };

  const handleStartTimeChange = (event: any, selectedTime: any) => {
    if (selectedTime) {
      const newStartDateTime = new Date(start);
      newStartDateTime.setHours(selectedTime.getHours());
      newStartDateTime.setMinutes(selectedTime.getMinutes());
      setStart(newStartDateTime);
      setEnd(newStartDateTime); // Set end date to match start date initially
      setShowStartTimePicker(false);
    }
  };

  const handleEndTimeChange = (event: any, selectedTime: any) => {
    if (selectedTime) {
      const newEndDateTime = new Date(start);
      newEndDateTime.setHours(selectedTime.getHours());
      newEndDateTime.setMinutes(selectedTime.getMinutes());
      setShowEndTimePicker(false);
      setEnd(newEndDateTime);
    }
  };

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
      <Button title="Start Date & Time" onPress={() => setShowStartDatePicker(true)} />
      {showStartDatePicker && (
        <DateTimePicker
          value={start}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          value={start}
          mode="time"
          display="default"
          onChange={handleStartTimeChange}
        />
      )}
      <Text>Start: {start.toLocaleString()}</Text>
      <Button
        title="End Date & Time"
        onPress={() => setShowEndTimePicker(true)}
        disabled={!start} // Disable if start date is not set
      />
      {showEndTimePicker && (
        <DateTimePicker
          value={end}
          mode="time"
          display="default"
          minuteInterval={15}
          timeZoneName='America/Los_Angeles'
          onChange={handleEndTimeChange}
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