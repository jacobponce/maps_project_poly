import Colors from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { defaultStyles } from '@/constants/Styles';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

const UserPage: React.FC = () => {
    const handleLogout = () => {
        // Add your logout logic here
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>User Page</Text>
            <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]}>
                <Text style={styles.btnPrimaryText} onPress={() => {
                    console.log('Signing out...');
                    FIREBASE_AUTH.signOut();
                }} >Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
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