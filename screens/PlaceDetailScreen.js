import React from 'react';
import { ScrollView, Image, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MapPreview from '../components/MapPreview';
import Colors from '../constants/Colors';

const PlaceDetailScreen = props => {

	const availablePlace = useSelector(state => state.places.places);
	const placeId = props.navigation.getParam('placeId');
	const selectedPlace = availablePlace.find(place => place.id === placeId);

	const selectedLocation = {
		lat: selectedPlace.lat,
		lng: selectedPlace.lng,
	};

	const showMapHandler = () => {
		props.navigation.navigate('Map', {
			readOnly: true,
			initialLocation: selectedLocation
		});
	}

	return (
		<ScrollView contentContainerStyle={{ alignItems: 'center' }}>
			<Image source={{ uri: selectedPlace.imageUri }} style={styles.image} />
			<View style={styles.locationContainer}>
				<Text style={styles.title}>{selectedPlace.title}</Text>
				<View style={styles.addressContainer}>
					<Text style={styles.address} lineBreakMode>{selectedPlace.address}</Text>
				</View>
			</View>
			<MapPreview
				style={styles.mapPreview}
				location={selectedLocation}
				onPress={showMapHandler}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 250,
		minHeight: 180,
		width: '100%',
		backgroundColor: '#ccc'
	},
	locationContainer: {
		marginVertical: 20,
		width: '90%',
		maxWidth: 350,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5,
		backgroundColor: 'white',
		borderRadius: 10
	},
	addressContainer: {
		padding: 20
	},
	address: {
		color: Colors.primary,
		textAlign: 'center',
	},
	mapPreview: {
		width: '100%',
		maxWidth: 350,
		height: 150,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10
	},
	title: {
		marginTop: 10
	}
});


PlaceDetailScreen.navigationOptions = navData => {
	return {
		headerTitle: navData.navigation.getParam('placeTitle')
	};
}

export default PlaceDetailScreen;