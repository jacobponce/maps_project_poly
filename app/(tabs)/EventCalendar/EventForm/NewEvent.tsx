import {View, Text, Button, FlatList, SafeAreaView, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';

const List = ({ navigation }: any) => {
  const [eventName, setEventName] = useState('');
  const [clubName, setClubName] = useState('');
<<<<<<< HEAD
  const [date, setDate] = useState('');
=======
  const [dateOfEvent, setDateOfEvent] = useState(new Date());
>>>>>>> ddc5eae (created new form system)
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
<<<<<<< HEAD
      date,
      start: start.toLocaleTimeString(),
      end: end.toLocaleTimeString(), // Added end to the database document
=======
      start: start.toString(),
      end: end.toString(), // Added end to the database document
>>>>>>> ddc5eae (created new form system)
      location,
    });
    console.log('Document written with ID: ', docRef.id);
    setEventName('');
    setClubName('');
<<<<<<< HEAD
    setDate('');
=======
>>>>>>> ddc5eae (created new form system)
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

<<<<<<< HEAD
  useEffect(() => {
    if (start){
    setDate(start.toISOString().split('T')[0]);
    }
  }, [start]);
    
=======
>>>>>>> ddc5eae (created new form system)
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
<<<<<<< HEAD
          timeZoneName='America/Los_Angeles'
=======
>>>>>>> ddc5eae (created new form system)
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
<<<<<<< HEAD
          timeZoneName='America/Los_Angeles'
=======
>>>>>>> ddc5eae (created new form system)
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