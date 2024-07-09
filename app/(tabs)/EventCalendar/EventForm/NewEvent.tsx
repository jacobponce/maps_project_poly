import {View, Text, Button, FlatList, SafeAreaView, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

const List = ({ navigation }: any) => {
  const [eventName, setEventName] = useState('');
  const [clubName, setClubName] = useState('');
  const [date, setDate] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date()); // Added end state
  const [location, setLocation] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false); // Added showEndPicker state
  const router = useRouter();

  const addEvent = async () => {
    const docRef = await addDoc(collection(FIREBASE_DB, 'events'), {
      eventName,
      clubName,
      date,
      start: start.toLocaleTimeString(),
      end: end.toLocaleTimeString(), // Added end to the database document
      location,
    });
    console.log('Document written with ID: ', docRef.id);
    setEventName('');
    setClubName('');
    setDate('');
    setStart(new Date());
    setEnd(new Date()); // Reset end state
    setLocation('');
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
    return eventName !== '' && clubName !== '' && location !== '';
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
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <Button
        title="Add Event"
        onPress={handlePress}
        disabled={!isFormValid()}
      />
    </SafeAreaView>
  );
};

export default List;