import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Expo from 'expo';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBFhx3Lp3mP4gLcG45A2bO0xd18FeZa2Ss",
  authDomain: "expo-react-native-todo.firebaseapp.com",
  databaseURL: "https://expo-react-native-todo.firebaseio.com",
  projectId: "expo-react-native-todo",
  storageBucket: "expo-react-native-todo.appspot.com",
  messagingSenderId: "191448678336"
};
firebase.initializeApp(firebaseConfig);

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if(user != null){
        console.log(user)
      }
    })
  }
  
  signUpUser = (email, password) => {
    try{
      if(this.state.password.length<6){
        alert('비밀번호는 6 문자 이상이어야 됩니다.')
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString());
    }
    
  }
  loginUser = (email, password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user) {
        console.log(user)
      })
    }
    catch(error){
      console.log(error.toString());
    }
  }
  loginWithFacebook = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('2220221314881153', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      
      const credential = firebase.auth.logInWithReadPermissionsAsync.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error)=>{
        console.log(error)
      })
    }
  }

  loginWithGoogle = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '698587011968-v9vtjspk672bgsfp1nsf8bbqai4aneu2.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log(result.accessToken);
      } else {
        console.log( cancelled )
      }
    } catch (e) {
      console.log('error', e)
    }
  };

  render() {
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>
          <Button style={{marginTop:10}}
            full
            rounded
            success
            onPress={()=>this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{color: 'white'}}>Login</Text>
          </Button>
          <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{color: 'white'}}>Sign Up</Text>
          </Button>
          <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{color: 'white'}}>Login With FaceBook</Text>
          </Button>
          <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={() => this.loginWithGoogle()}
          >
            <Text style={{color: 'white'}}>Login With Google</Text>
          </Button>
        </Form>
      </Container>
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
