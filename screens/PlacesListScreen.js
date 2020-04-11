import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	Platform,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const PlacesListScreen = props => {

	return (
		<View>
			<Text>NewPlaceScreen</Text>
		</View>
	);
};

PlacesListScreen.navigationOptions = navData => {
	return {
		headerTitle: 'All Places',
		headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
			<Item iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={() => {
				navData.navigation.navigate('NewPlace');
			}} />
		</HeaderButtons>
	};
};

const styles = StyleSheet.create({

});

export default PlacesListScreen;