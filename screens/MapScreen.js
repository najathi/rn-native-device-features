import React, { useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {

	const [selectedLocation, setSelectedLocation] = useState();

	const mapRegion = {
		latitude: 37.78,
		longitude: -122.43,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const selectLocationHandler = event => {
		console.log(event);
		setSelectedLocation({
			lat: event.nativeEvent.coordinate.latitude,
			lng: event.nativeEvent.coordinate.longitude,
		});
	}

	let markerCoordinates;

	if (selectedLocation) {
		markerCoordinates = {
			latitude: selectedLocation.lat,
			longitude: selectedLocation.lng,
		};
	}

	return (
		<View style={styles.container}>
			{/* <MapView style={styles.mapStyle} region={mapRegion} onPress={selectLocationHandler}> */}
			<MapView style={styles.mapStyle} onPress={selectLocationHandler}>
				{markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>}
			</MapView>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
});

export default MapScreen;