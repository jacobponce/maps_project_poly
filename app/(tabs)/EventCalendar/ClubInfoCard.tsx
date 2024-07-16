import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import useEventsList from './eventsList';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    clubInfoCard: {
        padding: 20,
        borderWidth: 1, 
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'f9f9f9',
      },
      clubInfoTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      clubInfoText:{
        fontSize: 18,
        marginBottom: 5,
      },
});

    const ClubInfoCard = () => {
        const { clubName } = useLocalSearchParams<{ clubName: string }>();
        const events = useEventsList();
      
        if (!clubName) {
          return (
            <SafeAreaView style={styles.container}>
              <Text style={styles.clubInfoTitle}>Club not found</Text>
            </SafeAreaView>
          );
        }
      
        const clubEvents = events.filter(event => event.clubName === clubName);
      
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.clubInfoCard}>
              <Text style={styles.clubInfoTitle}>{clubName}</Text>
              {clubEvents.map((event, index) => (
                <View key={index} style={styles.clubInfoText}>
                  <Text style={styles.clubInfoText}>Event: {event.eventName}</Text>
                  <Text style={styles.clubInfoText}>Date: {event.date}</Text>
                  <Text style={styles.clubInfoText}>Start: {event.start}</Text>
                  <Text style={styles.clubInfoText}>End: {event.end}</Text>
                  <Text style={styles.clubInfoText}>Location: {event.location.title}</Text>
                </View>
              ))}
            </View>
          </SafeAreaView>
        );
};

export default ClubInfoCard;
