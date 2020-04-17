import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImgPicker = props => {

	const [pickedImage, setPickedImage] = useState();

	verifyPermissions = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
		if (status !== 'granted') {
			Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.', [{ text: 'Okay' }]);
			return false;
		}
		return true;
	};

	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) {
			return;
		}
		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [16, 9],
			quality: 0.5,
		});

		// console.log(image);
		setPickedImage(image.uri);
		props.onImageTaken(image.uri);
	}

	return (
		<View style={styles.ImagePicker}>
			<View style={styles.imagePreview}>
				{!pickedImage ? <Text>No image picked yet.</Text> :
					<Image style={styles.image} source={{ uri: pickedImage }} />}
			</View>
			<Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} style={styles.button} />
		</View>
	);

};

const styles = StyleSheet.create({
	ImagePicker: {
		alignItems: 'center',
		marginBottom: 15
	},
	imagePreview: {
		width: '100%',
		height: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
		marginBottom: 25,
	},
	image: {
		width: '100%',
		height: '100%',
		marginBottom: 25,
	}
});

export default ImgPicker;