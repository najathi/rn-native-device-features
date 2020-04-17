import React, { useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TextInput,
	Button
} from 'react-native';
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {

	const [titleValue, setTitleValue] = useState('');
	const [selectedImage, setSelectedImage] = useState('');

	const dispatch = useDispatch(placesActions.addPlace(titleValue));

	const titleChangedHandler = text => {
		// you could add validation
		setTitleValue(text);
	}

	const savePlaceHandler = () => {
		dispatch(placesActions.addPlace(titleValue, selectedImage));
		props.navigation.goBack();
	}

	const imageSelectedHandler = imagePath => {
		setSelectedImage(imagePath);
	}

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					onChangeText={titleChangedHandler}
					value={titleValue} />
				<ImagePicker onImageTaken={imageSelectedHandler} />
				<LocationPicker navigation={props.navigation} />
				<Button
					title="Save Place"
					color={Colors.primary}
					onPress={savePlaceHandler} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	form: {
		margin: 30
	},
	label: {
		fontSize: 18,
	},
	textInput: {
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
		marginBottom: 30,
		paddingVertical: 4,
		paddingHorizontal: 2
	}
});

NewPlaceScreen.navigationOptions = {
	headerTitle: 'Add Place'
};

export default NewPlaceScreen;