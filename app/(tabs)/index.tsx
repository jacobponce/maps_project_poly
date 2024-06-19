import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
// 'index' always represents landing page
const INITIAL_REGION = {
    latitude: 35.302894,
    longitude: -120.660,
    latitudeDelta: 0.01,
    longitudeDelta: 0.015,
};

export default function MapView1() {
  return (
    <View style={{flex:1}}>
      <MapView 
      style={styles.map}
      initialRegion={INITIAL_REGION} 
      mapType='standard'
      userInterfaceStyle='dark'
      rotateEnabled={false}
      showsCompass={true}
      showsPointsOfInterest={false}
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
