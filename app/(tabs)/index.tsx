import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

const INITIAL_REGION = {
    latitude: 35.302894,
    longitude: -120.660,
    latitudeDelta: 0.025,
    longitudeDelta: 0.021,
};

export default function App() {
  return (
    <View style={{flex:1}}>
      <MapView 
      style={styles.map}
      initialRegion={INITIAL_REGION} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
