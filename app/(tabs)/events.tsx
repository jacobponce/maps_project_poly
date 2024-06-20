import React, { useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useFonts } from 'expo-font';

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
const Event = ({ event }: { event: EventType }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={styles.container}
    >
      <ThemedText style={styles.title}>{event.name} - {event.clubName}</ThemedText>
      {expanded && (
        <View style={styles.details}>
          <ThemedText>Date: {event.dateOfEvent}</ThemedText>
          <ThemedText>Duration: {event.duration}</ThemedText>
          <ThemedText>Location: {event.location}</ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Main component where events are stored and managed
const ClubEvents = () => {
  const [fontsLoaded] = useFonts({
    'NunitoSans': require('../../assets/fonts/NunitoSans.ttf'),
    'WorkSans': require('../../assets/fonts/WorkSans-Bold.ttf'),
  });

  const [events, setEvents] = useState<EventType[]>([
    { name: 'Ay club', clubName: 'Tech Club', dateOfEvent: '2023-04-15', duration: '2 hours', location: 'Auditorium' },
    { name: 'Music Night', clubName: 'Music Club', dateOfEvent: '2023-04-20', duration: '3 hours', location: 'Open Ground' },
    { name: 'Dance Workshop', clubName: 'Dance Club', dateOfEvent: '2023-04-25', duration: '2 hours', location: 'Dance Studio' },
    { name: 'Art Exhibition', clubName: 'Art Club', dateOfEvent: '2023-04-30', duration: '4 hours', location: 'Art Gallery' },
    { name: 'Literary Fest', clubName: 'Literary Club', dateOfEvent: '2023-05-05', duration: '5 hours', location: 'Library' },
    // Add more events here
  ]);

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
      <FlatList
        data={events}
        renderItem={({ item }) => <Event event={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

export default ClubEvents;