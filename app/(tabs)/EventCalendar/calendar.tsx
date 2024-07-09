import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useFonts } from 'expo-font';
import { Calendar } from 'react-native-calendars';
import { router, useRouter } from 'expo-router';
import useEventsList from './eventsList';
import { EventType } from './EventType';
// Define the event object type

// export type EventType = {
//   eventName: string;
//   clubName: string;
// data: string;
//   start: Date;
//   end: Date;
//   location: string;
// };

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
      <Text style={styles.title}>{event.eventName}</Text>
      <Text>Club Name: {event.clubName}</Text>
      <Text>Start: {event.start}</Text>
      <Text>End: {event.end}</Text>
      <Text>Location: {event.location}</Text>
    </View>
  );
};

// Main component where events are stored and managed
const ClubEvents = () => {
  const [fontsLoaded] = useFonts({
    'NunitoSans': require('../../../assets/fonts/NunitoSans.ttf'),
    'WorkSans': require('../../../assets/fonts/WorkSans-Bold.ttf'),
  });

  const events = useEventsList();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const markedDates = events.reduce((acc: { [key: string]: { marked: boolean; dotColor: string } }, event) => {
    acc[event.date] = { marked: true, dotColor: 'green' };
    return acc;
  }, {});

  const filteredEvents = events.filter(event => 
    event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.clubName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredClubs = [...new Set(events.map(event => event.clubName))].filter(club =>
    club.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 8);

  const eventsForSelectedDate = filteredEvents.filter(event => event.date === selectedDate);
  const router = useRouter();

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get the current date in 'YYYY-MM-DD' format
    setSelectedDate(today);
  }, []);

  const navNewEvent = () => {
    router.replace('/(tabs)/EventCalendar/EventForm/NewEvent');
    console.log('Going to new event...');
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setShowDropdown(text.length > 0);
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
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.search}
          placeholder="Search Club Event"
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
        {showDropdown && (
          <View style={styles.dropdown}>
            <FlatList
              data={filteredClubs}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.dropdownClub}
                  onPress={() => {
                  setSearchQuery(item);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownClubText}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            />
        </View>
      )}
      </View>
      <Calendar
        markedDates={markedDates}
        onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
      />
      <Button
        title="New Event"
        onPress={() => navNewEvent()}
      />
      {selectedDate ? (
        eventsForSelectedDate.length > 0 ? (
        <FlatList
          data={eventsForSelectedDate}
          renderItem={({ item }) => (<Event event={item} expanded={item.date === selectedDate} />)}
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