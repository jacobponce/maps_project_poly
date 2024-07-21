import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import useEventsList from '../../eventsList';
import BackButton from '@/components/BackButton';
import { useAppFonts } from '@/constants/Fonts';

const ClubInfoCard = () => {
    const { clubName } = useLocalSearchParams<{ clubName: string }>();
    const events = useEventsList();
    const router = useRouter();
    useAppFonts();

    const returnBack = () => {
      router.replace('../calendar');
      console.log('Going back...');
    };

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
        <BackButton onPress={returnBack}/>
        <View style={styles.clubInfoCard}>
          <Text style={styles.clubInfoTitle}>{clubName}</Text>
          <Text style={styles.clubInfoSubTitle}>About:</Text>
          <Text style={styles.clubInfoSubTitle}>Upcoming Events:</Text>
          {clubEvents.map((event, index) => (
            <View key={index} style={styles.clubInfoText}>
              <Text style={styles.clubEventTitle}>Event: {event.eventName}</Text>
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
  clubInfoCard: {
      marginTop: 20,
      padding: 20,
      borderWidth: 1, 
      borderColor: 'black',
      borderRadius: 10,
      backgroundColor: 'f9f9f9',
    },
    clubInfoTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily: 'NunitoSans'
    },
    clubInfoSubTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily: 'NunitoSans'
    },
    clubEventTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      fontFamily: 'NunitoSans'
    },
    clubInfoText:{
      fontSize: 18,
      marginBottom: 5,
    },
});
export default ClubInfoCard;
