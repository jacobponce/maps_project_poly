import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Image } from 'react-native';
const INITIAL_REGION = {
    latitude: 35.302894,
    longitude: -120.660,
    latitudeDelta: 0.01,
    longitudeDelta: 0.015,
};

let locationsOfInterest = [
  {
    title: "first",
    location:{
      latitude: 35.302,
      longitude: -120.660
    },
    description: "test marker"
  }
]

export default function MapView1() {
  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      const iconSource = require('@/assets/images/wbrawler.png')
      return (
        <Marker
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        >
      <Image
        source={iconSource}
        style={{ width: 50.5, height: 50 }} // Adjust the size as needed
        resizeMode="contain" // Adjust how the image fits within the bounds (optional)
      />
      </Marker>
      )
    })
  }

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
      >
        {showLocationsOfInterest()}
      </MapView>
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
