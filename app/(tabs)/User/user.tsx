import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const UserPage = () => {
    const user = FIREBASE_AUTH.currentUser;
    const email = user?.email;
    const router = useRouter();

    const navClubInfo = () => {
      router.push('/(tabs)/User/clubForm/clubForm');
      console.log('Going to new event...');
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.profile}>
            <Text style={styles.labelFont}>Email: {email}</Text>
            <Button title="My Club" onPress={navClubInfo} />
          </View>
          <View>
              <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]}>
                  <Text style={styles.btnPrimaryText} onPress={() => {
                      console.log('Signing out...');
                      FIREBASE_AUTH.signOut();
                  }} >Sign Out</Text>
              </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
    },
    profile: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginVertical: 20,
      marginHorizontal: 20,
    },
    labelFont: {
      fontWeight: "bold",
      flexDirection: "row",
      fontSize: 24,
      marginBottom: 10,
      marginHorizontal: 8,
    },
    logo: {
      width: 60,
      height: 60,
      alignSelf: 'center',
      marginVertical: 80,
    },
    title: {
      fontSize: 30,
      marginBottom: 20,
      fontWeight: 'bold',
      alignSelf: 'center',
    },
    inputField: {
      marginVertical: 4,
      height: 50,
      borderWidth: 1,
      borderColor: Colors.primary,
      borderRadius: 12,
      padding: 10,
      backgroundColor: '#fff',
    },
    btnPrimary: {
      backgroundColor: Colors.primary,
      marginVertical: 4,
      marginLeft: 20,
      marginRight: 20,
    },
    btnPrimaryText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
export default UserPage;