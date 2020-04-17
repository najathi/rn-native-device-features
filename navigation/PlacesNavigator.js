import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';

import PlacesListScreen from '../screens/PlacesListScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import Colors from '../constants/Colors';

const PlaceNavigator = createStackNavigator({
	Places: PlacesListScreen,
	PlaceDetail: PlaceDetailScreen,
	NewPlace: NewPlaceScreen,
	Map: MapScreen
}, {
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
		},
		headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
	}
});

export default createAppContainer(PlaceNavigator);