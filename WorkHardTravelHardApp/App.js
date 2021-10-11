import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';

const STORAGE_KEY = '@toDos';

export default function App() {
	const [ working, setWorking ] = useState(true);
	const [ text, setText ] = useState('');
	const [ toDos, setToDos ] = useState({});

	useEffect(() => {
		loadToDos();
	}, []);

	const travel = () => setWorking(false);
	const work = () => setWorking(true);
	const onChangeText = (payload) => setText(payload);
	const saveToDos = async (toSave) => {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
	};
	const loadToDos = async () => {
		const s = await AsyncStorage.getItem(STORAGE_KEY);
		setToDos(JSON.parse(s));
	};

	const addTodo = async () => {
		if (text === '') {
			return;
		}
		const newToDos = Object.assign({}, toDos, {
			[Date.now()]: { text, working }
		});
		setToDos(newToDos);
		await saveToDos(newToDos);
		setText('');
	};
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.header}>
				<TouchableOpacity onPress={work}>
					<Text style={{ ...styles.btnText, color: working ? 'white' : theme.grey }}>Work</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={travel}>
					<Text style={{ ...styles.btnText, color: working ? theme.grey : 'white' }}>Travel</Text>
				</TouchableOpacity>
			</View>
			<View>
				<TextInput
					value={text}
					onSubmitEditing={addTodo}
					onChangeText={onChangeText}
					placeholder={working ? 'What do you have to do?' : 'Where do you want go?'}
					style={styles.input}
				/>
			</View>
			<ScrollView>
				{toDos ? (
					Object.keys(toDos).map(
						(key) =>
							toDos[key].working === working ? (
								<View style={styles.toDo} key={key}>
									<Text style={styles.toDoText}>{toDos[key].text}</Text>
								</View>
							) : null
					)
				) : null}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: theme.bg,
		paddingHorizontal: 20
	},
	header: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginTop: 100
	},
	btnText: {
		fontSize: 38,
		fontWeight: '600'
	},
	input: {
		backgroundColor: 'white',
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 30,
		marginTop: 20,
		fontSize: 18,
		marginVertical: 20
	},
	toDo: {
		backgroundColor: theme.grey,
		marginBottom: 10,
		paddingVertical: 20,
		paddingHorizontal: 20,
		borderRadius: 15
	},
	toDoText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500'
	}
});
