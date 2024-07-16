import {View, Text, Button, FlatList, SafeAreaView, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

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
    <View >
      <Text style={ styles.dateText }>Select a Location:</Text>
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
  const [isStartFinalized, setIsStartFinalized] = useState(false);


  const router = useRouter();

  const handleStartDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      setStart(selectedDate);
      setEnd(selectedDate); // Set end date to match start date initially
    }
    setShowStartTimePicker(true); 
  };

  const handleStartTimeChange = (event: any, selectedTime: any) => {
    if (selectedTime) {
      const newStartDateTime = new Date(start);
      newStartDateTime.setHours(selectedTime.getHours());
      newStartDateTime.setMinutes(selectedTime.getMinutes());
      setStart(newStartDateTime);
      
      const newEndDateTime = new Date(newStartDateTime);
      newEndDateTime.setMinutes(newEndDateTime.getMinutes() + 30);
      setEnd(newEndDateTime);

      setShowStartTimePicker(false);
      setShowStartDatePicker(false);
      setIsStartFinalized(true);
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
    router.replace('/(tabs)/EventCalendar/calendar');
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New Event Request</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Name"
        value={eventName}
        onChangeText={setEventName}
      />
      <TextInput
        style={styles.input}
        placeholder="Club Name"
        value={clubName}
        onChangeText={setClubName}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.dateText}>Start: {start.toLocaleString()}</Text>
        <Button title="Start Date & Time" onPress={() => setShowStartDatePicker(true)} />
      </View>
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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.dateText}>End: {end.toLocaleString()}</Text>
        <Button
          title="End Date & Time"
          onPress={() => setShowEndTimePicker(true)}
          disabled={!isStartFinalized}
        />
      </View>
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
      <LocationPicker onSelectLocation={setSelectedLocation} />
      <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} >
            <Text 
              style={styles.btnPrimaryText} 
              onPress={handlePress}
              disabled={!isFormValid()}
              >Send Event Request
              </Text>
          </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    borderLeftWidth: 20,
    borderLeftColor: '#ffffff',
    borderRightWidth: 20,
    borderRightColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.green,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default List;