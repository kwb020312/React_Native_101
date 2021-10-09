import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native';
import { theme } from './colors';

export default function App() {
	const [ working, setWorking ] = useState(true);
	const [ text, setText ] = useState('');
	const [ toDos, setToDos ] = useState({});
	const travel = () => setWorking(false);
	const work = () => setWorking(true);
	const onChangeText = (payload) => setText(payload);
	const addTodo = () => {
		if (text === '') {
			return;
		}
		const newToDos = Object.assign({}, toDos, {
			[Date.now()]: { text, work: working }
		});
		setToDos(newToDos);
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
					placeholder={working ? 'Add a To Do' : 'Where do you want go?'}
					style={styles.input}
				/>
			</View>
			<ScrollView>
				{Object.keys(toDos).map((key) => (
					<View style={styles.toDo} key={key}>
						<Text style={styles.toDoText}>{toDos[key].text}</Text>
					</View>
				))}
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
