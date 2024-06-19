import { ThemedText } from '@/components/ThemedText';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import React, { useState } from 'react';

// Define the event object type
type EventType = {
  name: string;
  clubName: string;
  dateOfEvent: string;
  duration: string;
  location: string;
};

const titleStyles = StyleSheet.create({
    container:{
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
    },
});


// Event component to display individual event details
const Event = ({ event }: { event: EventType }) => (
  <View style= {titleStyles.container}>
    <ThemedText>{event.name} - {event.clubName}</ThemedText>
    <ThemedText>Date: {event.dateOfEvent}</ThemedText>
    <ThemedText>Duration: {event.duration}</ThemedText>
    <ThemedText>Location: {event.location}</ThemedText>
  </View>
);

// EventList component to map through the events and render an Event component for each
const EventList = ({ events }: { events: EventType[] }) => (
  <View>
    {events.map((event, index) => (
      <Event key={index} event={event} />
    ))}
  </View>
);

// Main component where events are stored and managed
const ClubEvents = () => {
  // Sample events data
  const [events, setEvents] = useState<EventType[]>([
    { name: 'NSU', clubName: 'Tech Club', dateOfEvent: '2023-04-15', duration: '2 hours', location: 'Auditorium' },
    { name: 'Music Night', clubName: 'Music Club', dateOfEvent: '2023-04-20', duration: '3 hours', location: 'Open Ground' },
    { name: 'Dance Workshop', clubName: 'Dance Club', dateOfEvent: '2023-04-25', duration: '2 hours', location: 'Dance Studio'},
    { name: 'Art Exhibition', clubName: 'Art Club', dateOfEvent: '2023-04-30', duration: '4 hours', location: 'Art Gallery'},
    { name: 'Literary Fest', clubName: 'Literary Club', dateOfEvent: '2023-05-05', duration: '5 hours', location: 'Library'}
    // Add more events here
  ]);

  return (
    <View
        style={
            {flex:1,backgroundColor: '#eeeeee'}
        }>
      <ThemedText>Club Events</ThemedText>
      <FlatList data={events} 
        renderItem={({ item }) => 
            <Text>
                {item.name} with {item.clubName}
            </Text>} />
    </View>
  );
};

export default ClubEvents;