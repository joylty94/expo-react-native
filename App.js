import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Expo from 'expo';
import * as firebase from 'firebase';

import { createStackNavigator } from 'react-navigation';

import LoginScreen from './Screen/LoginScreen';
import ToDoScreen from './Screen/ToDoScreen';

const firebaseConfig = {
  apiKey: "AIzaSyBFhx3Lp3mP4gLcG45A2bO0xd18FeZa2Ss",
  authDomain: "expo-react-native-todo.firebaseapp.com",
  databaseURL: "https://expo-react-native-todo.firebaseio.com",
  projectId: "expo-react-native-todo",
  storageBucket: "expo-react-native-todo.appspot.com",
  messagingSenderId: "191448678336"
};
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  static navigationOptions = {
    headerTitle: 'Login',
  }
  render() {
    return(
      <AppStackNavigator/>
    )
  };
}

const AppStackNavigator = createStackNavigator({
  ToDoScreen: { screen: ToDoScreen },
  LoginScreen: { screen: LoginScreen },
})
