import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import ENV from '../env';

const MapPreview = props => {
	let imagePreviewUrl;

	if (props.location) {
		imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV().googleApiKey}`;
	}

	// console.log('url', imagePreviewUrl);
	// console.log('props.location', props.location);

	return (
		<TouchableOpacity onPress={props.onPress} style={{ ...style.MapPreview, ...props.style }}>
			{props.location ? <Image style={style.mapImage} source={{ uri: imagePreviewUrl }} /> : props.children}
		</TouchableOpacity>
	);

}

const style = StyleSheet.create({
	MapPreview: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	mapImage: {
		width: '100%',
		height: '100%'
	}
});

export default MapPreview;