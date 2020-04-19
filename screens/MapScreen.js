import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

const MapScreen = props => {

	const initialLocation = props.navigation.getParam('initialLocation');
	const readOnly = props.navigation.getParam('readOnly');

	const [selectedLocation, setSelectedLocation] = useState(initialLocation);

	const mapRegion = {
		latitude: initialLocation ? initialLocation.lat : 6.902725,
		longitude: initialLocation ? initialLocation.lat : 79.899389,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	const selectLocationHandler = event => {
		// console.log(event);
		if (readOnly) {
			return;
		}
		setSelectedLocation({
			lat: event.nativeEvent.coordinate.latitude,
			lng: event.nativeEvent.coordinate.longitude,
		});
	}

	const savePickedLocationHandler = useCallback(() => {
		if (!selectedLocation) {
			//Alert.alert(); // you could show an alert
			return;
		}

		// props.navigation.goBack();
		props.navigation.navigate('NewPlace', { pickedLocation: selectedLocation });
	}, [selectedLocation]);

	useEffect(() => {
		props.navigation.setParams({ saveLocation: savePickedLocationHandler });
	}, [savePickedLocationHandler]);

	let markerCoordinates;

	if (selectedLocation) {
		markerCoordinates = {
			latitude: selectedLocation.lat,
			longitude: selectedLocation.lng,
		};
	}

	return (
		<View style={styles.container}>
			{/* Specify the region of location */}
			{/* <MapView style={styles.mapStyle} region={mapRegion} onPress={selectLocationHandler}> */}

			{/* there is not specify the region of location  */}
			{/* <MapView style={styles.mapStyle} onPress={selectLocationHandler}>
				{markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>}
			</MapView> */}

			<MapView
				style={styles.mapStyle}
				onPress={selectLocationHandler}
				region={mapRegion} provider="google"
				zoomEnabled={true}>
				{markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>}
			</MapView>
		</View >
	);
};


MapScreen.navigationOptions = navData => {
	const saveFn = navData.navigation.getParam('saveLocation');
	const readOnly = navData.navigation.getParam('readOnly');
	if (readOnly) {
		return {};
	}
	return {
		headerRight: (
			<TouchableOpacity style={styles.headerButton} onPress={saveFn}>
				<Text style={styles.headerButtonText}>Save</Text>
			</TouchableOpacity>
		)
	};
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
	headerButton: {
		marginHorizontal: 20
	},
	headerButtonText: {
		fontSize: 16,
		color: Platform.OS === 'android' ? 'white' : Colors.primary
	}
});

export default MapScreen;