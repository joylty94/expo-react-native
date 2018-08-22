import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyASYsh99Lfitc5LXME5538i7126HE4pjnU",
  authDomain: "react-native-d21a0.firebaseapp.com",
  databaseURL: "https://react-native-d21a0.firebaseio.com",
  projectId: "react-native-d21a0",
  storageBucket: "",
  messagingSenderId: "157746092816"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
