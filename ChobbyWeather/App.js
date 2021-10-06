import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.city}>
				<Text style={styles.cityName}>Seoul</Text>
			</View>
			<View style={styles.weather}>
				<View style={styles.day}>
					<Text style={styles.temp}>27</Text>
					<Text style={styles.description}>Sunny</Text>
				</View>
			</View>
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
		backgroundColor: 'blue',
		justifyContent: 'center',
		alignItems: 'center'
	},
	cityName: {
		fontSize: 68,
		fontWeight: '500'
	},
	weather: {
		flex: 3,
		backgroundColor: 'teal'
	},
	day: {
		backgroundColor: 'teal',
		flex: 1,
		marginTop: -30,
		alignItems: 'center'
	},
	temp: {
		fontSize: 178
	},
	description: {
		fontSize: 60
	}
});