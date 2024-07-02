import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useFonts } from 'expo-font';
import { Calendar } from 'react-native-calendars';

// Define the event object type
type EventType = {
  name: string;
  clubName: string;
  dateOfEvent: string;
  duration: string;
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
      <ThemedText style={styles.title}>{event.name} - {event.clubName}</ThemedText>
      {expanded && (
        <View style={styles.details}>
          <ThemedText>Date: {event.dateOfEvent}</ThemedText>
          <ThemedText>Duration: {event.duration}</ThemedText>
          <ThemedText>Location: {event.location}</ThemedText>
        </View>
      )}
    </View>
  );
};

// Main component where events are stored and managed
const ClubEvents = () => {
  const [fontsLoaded] = useFonts({
    'NunitoSans': require('../../assets/fonts/NunitoSans.ttf'),
    'WorkSans': require('../../assets/fonts/WorkSans-Bold.ttf'),
  });

  const [events, setEvents] = useState<EventType[]>([
    { name: 'Ay club', clubName: 'Tech Club', dateOfEvent: '2024-07-15', duration: '2 hours', location: 'Auditorium' },
    { name: 'Derrick Sr club', clubName: 'Jacob Dad Club', dateOfEvent: '2024-07-15', duration: '4 hours', location: 'Wrangler Drive' },
    { name: 'Surge Club', clubName: 'Top Brawlers Club', dateOfEvent: '2024-07-02', duration: '24 hours', location: 'Brawl Pass' },
    { name: 'Music Night', clubName: 'Music Club', dateOfEvent: '2024-07-20', duration: '3 hours', location: 'Open Ground' },
    { name: 'Dance Workshop', clubName: 'Dance Club', dateOfEvent: '2024-07-25', duration: '2 hours', location: 'Dance Studio' },
    { name: 'Art Exhibition', clubName: 'Art Club', dateOfEvent: '2024-07-30', duration: '4 hours', location: 'Art Gallery' },
    { name: 'Literary Fest', clubName: 'Literary Club', dateOfEvent: '2024-07-05', duration: '5 hours', location: 'Library' },
    // Add more events here
  ]);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates = events.reduce((acc: { [key: string]: { marked: boolean; dotColor: string } }, event) => {
    acc[event.dateOfEvent] = { marked: true, dotColor: 'blue' };
    return acc;
  }, {});

  const eventsForSelectedDate = events.filter(event => event.dateOfEvent === selectedDate);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
    setSelectedDate(today);
  }, []);

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
      <ThemedText style={{ fontSize: 30, paddingTop: 10, marginBottom: 10 }}>Club Events</ThemedText>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />
      {selectedDate ? (
        eventsForSelectedDate.length > 0 ? (
        <FlatList
          data={eventsForSelectedDate}
          renderItem={({ item }) => (<Event event={item} expanded={item.dateOfEvent === selectedDate} />)}
          keyExtractor={(item, index) => index.toString()}
      />
      ) : (
        <View style={{ padding: 10 }}>
          <ThemedText style={{ fontSize: 24 }}>You have no events today.</ThemedText>
        </View>
      )
    ) : (
      <View style={{ padding: 10 }}>
        <ThemedText style={{ fontSize: 24 }}>Select a date to see the events.</ThemedText>
      </View>
    )}
    </SafeAreaView>
  );
};

export default ClubEvents;