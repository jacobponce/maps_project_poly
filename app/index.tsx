import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const { type } = useLocalSearchParams<{ type: string }>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert('Check your email for verification');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={70}
      style={styles.container}>
      {loading && (
        <View style={defaultStyles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <SafeAreaView>
      <Text style={styles.title}>PolyMaps</Text>
      <View style={{ marginBottom: 30 }}>
        <TextInput
          autoCapitalize="none"
          placeholder="darryl@supercell.com"
          onChangeText={setEmail}
          value={email}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          onChangeText={setPassword}
          value={password}
          style={styles.inputField}
          secureTextEntry={true}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff"/>
      ) : (
        <>
          <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]}>
            <Text  style={styles.btnPrimaryText} onPress={signIn}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[defaultStyles.btn, styles.btnPrimary]} >
            <Text style={styles.btnPrimaryText} onPress={signUp}>Create account</Text>
          </TouchableOpacity>
        </>
      )}
      </SafeAreaView>
    </KeyboardAvoidingView>
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

export default Login;