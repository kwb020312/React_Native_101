import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>Seoul</Text>
			</View>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				horizontal
				contentContainerStyle={styles.weather}
			>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'tomato'
	},
	city: {
		flex: 1.2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	cityName: {
		fontSize: 58,
		fontWeight: '500'
	},
	weather: {},
	day: {
		width: SCREEN_WIDTH,
		alignItems: 'center'
	},
	temp: {
		fontSize: 178,
		marginTop: 50,
		fontWeight: '600'
	},
	description: {
		fontSize: 60
	}
});
