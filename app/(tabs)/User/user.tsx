import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';



const UserPage = () => {
    const user = FIREBASE_AUTH.currentUser;
    const email = user?.email;
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <SafeAreaView style={styles.profileRow}>
          <Text style={styles.labelFont}>{email}</Text>
        </SafeAreaView>
        <>
            <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]}>
                <Text style={styles.btnPrimaryText} onPress={() => {
                    console.log('Signing out...');
                    FIREBASE_AUTH.signOut();
                }} >Sign Out</Text>
            </TouchableOpacity>
        </>
        </View>
    );
};
const styles = StyleSheet.create({
    profileRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 10,
    },
    labelFont: {
      fontWeight: "bold",
      flexDirection: "row",
      fontSize: 30,
      width: 200,
      marginTop: 10,
    },
    container: {
      flex: 1,
      // justifyContent: 'center',
      padding: 20,
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
    },
    btnPrimaryText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
export default UserPage;