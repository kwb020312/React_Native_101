import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from './colors';
import { Fontisto, FontAwesome5 } from '@expo/vector-icons';

const STORAGE_KEY = '@toDos';
const CATEGORY_KEY = '@category';

export default function App() {
	const [ working, setWorking ] = useState(true);
	const [ text, setText ] = useState('');
	const [ toDos, setToDos ] = useState({});

	useEffect(() => {
		loadToDos();
		getCategory();
	}, []);
	const changeCategory = () => {
		setWorking((prev) => !prev);
		saveCategory();
	};
	const onChangeText = (payload) => setText(payload);
	const saveToDos = async (toSave) => {
		await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
	};
	const loadToDos = async () => {
		const s = await AsyncStorage.getItem(STORAGE_KEY);
		if (s) {
			setToDos(JSON.parse(s));
		}
	};
	const saveCategory = async () => {
		await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify(working));
	};
	const getCategory = async () => {
		const prevCategory = await AsyncStorage.getItem(CATEGORY_KEY);
		setWorking(JSON.parse(prevCategory));
	};
	const addTodo = async () => {
		if (text === '') {
			return;
		}
		const newToDos = Object.assign({}, toDos, {
			[Date.now()]: { text, working, isComplete: false }
		});
		setToDos(newToDos);
		await saveToDos(newToDos);
		setText('');
	};

	const deleteToDo = (key) => {
		if (Platform.OS === 'web') {
			const ok = confirm('Do you want to delete this To Do?');
			if (ok) {
				const newToDos = { ...toDos };
				delete newToDos[key];
				setToDos(newToDos);
				saveToDos(newToDos);
			}
		} else {
			Alert.alert('Delete To Do?', 'Are You sure?', [
				{ text: 'Cancel', style: 'cancel' },
				{
					text: "I'm Sure",
					style: 'destructive',
					onPress: () => {
						const newToDos = { ...toDos };
						delete newToDos[key];
						setToDos(newToDos);
						saveToDos(newToDos);
					}
				}
			]);
		}
	};

	const toggleCompleteToDo = (key) => {
		let newToDo = { ...toDos };
		newToDo[key].isComplete = !newToDo[key].isComplete;
		setToDos(newToDo);
		saveToDos(newToDo);
	};

	const editToDo = (key) => {
		if (Platform.OS === 'web') {
			const val = prompt('How Do you want Change This Text??');
			let newToDo = { ...toDos };
			newToDo[key].text = val;
			setToDos(newToDo);
			saveToDos(newToDo);
		} else {
			Alert.prompt('Change Text', 'How Do you want Change This Text??', (val) => {
				let newToDo = { ...toDos };
				newToDo[key].text = val;
				setToDos(newToDo);
				saveToDos(newToDo);
			});
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<View style={styles.header}>
				<TouchableOpacity onPress={changeCategory}>
					<Text
						style={{
							fontSize: 38,
							fontWeight: '600',
							color: working ? 'white' : theme.grey
						}}
					>
						Work
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={changeCategory}>
					<Text
						style={{
							fontSize: 38,
							fontWeight: '600',
							color: working ? theme.grey : 'white'
						}}
					>
						Travel
					</Text>
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
									<Text
										style={
											toDos[key].isComplete ? (
												{
													...styles.toDoText,
													textDecorationLine: 'line-through'
												}
											) : (
												styles.toDoText
											)
										}
									>
										{toDos[key].text}
									</Text>
									<View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
										<TouchableOpacity style={{ marginRight: 15 }} onPress={() => deleteToDo(key)}>
											<Fontisto name="trash" size={18} color="white" />
										</TouchableOpacity>
										<TouchableOpacity style={{ marginRight: 15 }} onPress={() => editToDo(key)}>
											<FontAwesome5 name="pencil-alt" size={18} color="white" />
										</TouchableOpacity>
										<TouchableOpacity onPress={() => toggleCompleteToDo(key)}>
											<Fontisto
												name={toDos[key].isComplete ? 'checkbox-active' : 'checkbox-passive'}
												size={18}
												color="white"
											/>
										</TouchableOpacity>
									</View>
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
	btnText: {},
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
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	toDoText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '500'
	}
});
