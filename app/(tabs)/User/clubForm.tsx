import { setDoc, doc, collection } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ClubForm = ({ navigation }: any) => {    
    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');
    
    const handleClubNameChange = (text: string) => setClubName(text);
    const handleClubDescriptionChange = (text: string) => setClubDescription(text);
    
    const handleSave = async (clubId: string) => {
        if (clubName && clubDescription) {
            try {
                const clubData = {
                    clubName: clubName,
                    description: clubDescription,
                };
    
                if (clubId) {
                    // Update existing document
                    await setDoc(doc(FIREBASE_DB, 'clubs', clubId), clubData);
                    console.log('Document updated with ID: ', clubId);
                } else {
                    // Create new document
                    const docRef = await setDoc(doc(collection(FIREBASE_DB, 'clubs')), clubData);
                    console.log('Document written with ID: ');
                }
            } catch (e) {
                console.error('Error adding/updating document: ', e);
            }
        }
    };
    const saveClub = async () => {
        await handleSave(clubName, clubDescription);
    };
    
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.header}>Club Profile Info</Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Club Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={clubName}
                        onChangeText={setClubName}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Club Description:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={clubDescription}
                        onChangeText={setClubDescription}
                        multiline
                    />
                </View>
                <Button title="Save" onPress={saveClub} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});

export default ClubForm;