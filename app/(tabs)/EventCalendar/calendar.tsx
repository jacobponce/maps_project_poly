import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { Calendar } from 'react-native-calendars';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { router, useRouter } from 'expo-router';

// Define the event object type
type EventType = {
  eventName: string;
  clubName: string;
  start: string;
  end: string;
  location: string;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'NunitoSans',
  },
  details: {
    paddingTop: 10,
  },
});

// Modified Event component to include collapsible functionality
const Event = ({ event, expanded }: { event: EventType, expanded: boolean }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.eventName} - {event.clubName}</Text>
      {expanded && (
        <View style={styles.details}>
          <Text>Start: {event.start}</Text>
          <Text>End: {event.end}</Text>
          <Text>Location: {event.location}</Text>
        </View>
      )}
    </View>
  );
};

// Main component where events are stored and managed
const ClubEvents = () => {
  const [fontsLoaded] = useFonts({
    'NunitoSans': require('../../../assets/fonts/NunitoSans.ttf'),
    'WorkSans': require('../../../assets/fonts/WorkSans-Bold.ttf'),
  });

  const [events, setEvents] = useState<EventType[]>([]);
  
    useEffect(() => {
      const fetchEvents = async () => {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "events")); // Assuming your collection is named "clubs"
        const fetchedEvents = querySnapshot.docs.map(doc => ({ ...doc.data() })) as EventType[];
        setEvents(fetchedEvents);
      };
  
      fetchEvents();
    }, []);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates = events.reduce((acc: { [key: string]: { marked: boolean; dotColor: string } }, event) => {
    acc[event.start] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  const eventsForSelectedDate = events.filter(event => event.start === selectedDate);
  const router = useRouter();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
    setSelectedDate(today);
  }, []);

  const navNewEvent = () => {
    router.replace('/(tabs)/EventCalendar/EventForm/NewEvent');
    console.log('Going to new event...');
  };



  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        borderLeftWidth: 20,
        borderLeftColor: '#ffffff',
        borderRightWidth: 20,
        borderRightColor: '#ffffff',
      }}
    >
      <Text style={{ fontSize: 30, paddingTop: 10, marginBottom: 10 }}>Club Events</Text>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
        sty
      />
      <Button
        title="New Event"
        onPress={() => navNewEvent()}
      />
      {selectedDate ? (
        eventsForSelectedDate.length > 0 ? (
        <FlatList
          data={eventsForSelectedDate}
          renderItem={({ item }) => (<Event event={item} expanded={item.start === selectedDate} />)}
          keyExtractor={(item, index) => index.toString()}
      />
      ) : (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 24 }}>You have no events today.</Text>
        </View>
      )
    ) : (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 24 }}>Select a date to see the events.</Text>
      </View>
    )}
    </SafeAreaView>
  );
};

export default ClubEvents;