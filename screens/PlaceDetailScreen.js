import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const PlaceDetailScreen = props => {

	const availablePlace = useSelector(state => state.places.places);
	const placeId = props.navigation.getParam('placeId');
	const selectedPlace = availablePlace.find(place => place.id === placeId);

	return (
		<View>
			<Text>{selectedPlace.title}</Text>
		</View>
	);
};

const Styles = StyleSheet.create({

});

PlaceDetailScreen.navigationOptions = navData => {
	return {
		headerTitle: navData.navigation.getParam('placeTitle')
	};
}

export default PlaceDetailScreen;