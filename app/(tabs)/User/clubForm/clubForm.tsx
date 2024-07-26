import { setDoc, doc, collection, deleteDoc, getDoc } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import BackButton from '@/components/BackButton';
import { useRouter } from 'expo-router';
import { useAppFonts } from '@/constants/Fonts';

const ClubForm = ({ navigation }: any) => {    
    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');
    const [originalClubName, setOriginalClubName] = useState('');
    const [originalClubDescription, setOriginalClubDescription] = useState('');

    useEffect(() => {
        const fetchOriginalClubName = async () => {
            try {
                const auth = getAuth();
                const user = auth.currentUser;

                if (user) {
                    const userId = user.uid;
                    const docRef = doc(FIREBASE_DB, 'clubs', userId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const fetchedClubName = docSnap.data().name;
                        const fetchedClubDescription = docSnap.data().description;
                        setClubName(fetchedClubName);
                        setOriginalClubName(fetchedClubName);
                        setClubDescription(fetchedClubDescription);
                        setOriginalClubDescription(fetchedClubDescription);
                    } 
                } else {
                    console.log('No user is signed in.');
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        };

        fetchOriginalClubName();
    }, []);
    
    const handleSave = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const userId = user.uid;
                const docRef = doc(FIREBASE_DB, 'clubs', userId);
                await setDoc(docRef, { name: clubName, description: clubDescription });
                console.log('Club saved successfully with ID: ', userId); 
            } else {
                console.log('No user is signed in.');
            }
        } catch (error) {
            console.error('Error creating club:', error);
        }
    };

    const router = useRouter();
    useAppFonts();

    const returnBack = () => {
      router.replace('../user');
      console.log('Going back...');
    };

    const handleSavePress = () => {
        handleSave();
        returnBack();
    }

    return (
        <SafeAreaView>
            <BackButton onPress={returnBack}/>
            <View style={styles.container}>
                <Text style={styles.header}>Club Profile Info</Text>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Club Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={clubName}
                        onChangeText={setClubName}
                        defaultValue={originalClubName}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Club Description:</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={clubDescription}
                        onChangeText={setClubDescription}
                        defaultValue={originalClubDescription}
                        multiline
                    />
                </View>
                <Button title="Save" onPress={handleSavePress} />
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