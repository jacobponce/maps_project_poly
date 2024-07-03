import React, { useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, View, Image, Text } from 'react-native';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationOfInterest {
  title: string;
  location: Location;
  description: string;
}

const INITIAL_REGION = {
  latitude: 35.302894,
  longitude: -120.660,
  latitudeDelta: 0.01,
  longitudeDelta: 0.015,
};

export default function MapView1() {
  const [locationsOfInterest, setLocationsOfInterest] = useState<LocationOfInterest[]>([
    {
      title: "first",
      location: {
        latitude: 35.302,
        longitude: -120.660
      },
      description: "test marker\nLatitude: 35.302, Longitude: -120.660"
    }
  ]);

  const handleMapPress = (event: { nativeEvent: { coordinate: Location } }) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Debugging statement
    const newLocation: LocationOfInterest = {
      title: "New Marker",
      location: event.nativeEvent.coordinate,
      description: `Derrick is my Son\nLatitude: ${latitude}, Longitude: ${longitude}`
    };
    setLocationsOfInterest([...locationsOfInterest, newLocation]);
  };

  const showLocationsOfInterest = () => {
    return locationsOfInterest.map((item, index) => {
      const iconSource = require('@/assets/images/wbrawler.png');
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
            resizeMode="contain" // Adjust how the image fits within the bounds 
          />
          <Callout>
            <View>
              <Text>{item.description}</Text>
            </View>
          </Callout>
        </Marker>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        mapType='standard'
        userInterfaceStyle='dark'
        rotateEnabled={false}
        showsCompass={true}
        showsPointsOfInterest={false}
        onPress={handleMapPress}
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

// import React from 'react';
// import { View, Text } from 'react-native';

// export default function MyPage() {
//   return (
//     <View>
//       <Text>This is my page.</Text>
//     </View>
//   );
// }