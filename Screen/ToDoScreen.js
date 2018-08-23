import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, Fab } from 'native-base';

import LoginScreen from './LoginScreen';

var data = ['aaaa', 'bbbb']

export default class ToDo extends Component {
    
    constructor(props) {
        super(props);
        
        this.ds = new ListView.DataSource({ rowHasChanged : (r1, r2) => r1 !== r2 })
        
        this.state = {
            listViewData: data,
            newContact: '',
            Login: false,
            currentUser: null,
            active: 'true'
        }
    }

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        const { currentUser } = firebase.auth();
        if (currentUser) {
            this.setState({
                currentUser,
            });
        } else {
            this.setState({
                loading: true,
            });
            const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                unsubscribe();
                if (user) {
                    this.setState({
                        currentUser: user,
                        loading: false,
                    });
                } else {
                    this.setState({
                        Login: true,
                    });
                }
            });
        }
    }

    // logOut = async () => {
    //     await firebase.auth().signOut();
    //     this.setState({
    //         login: true,
    //     })
    // }
    render() {
        // if(this.state.Login) {
        //     return(
        //         this.props.navigation.navigate('LoginScreen')
        //     )
        // }
        return(
            <Container style={styles.container}>
                <Header style={{ marginTop: StatusBar.currentHeight }}>
                    <Content>
                        <Item>
                            <Input 
                                placeholder="Add name"/>
                            <Button>
                                <Icon name="add"/>
                            </Button>
                        </Item>
                    </Content>
                </Header>
                <Content>
                    <List 
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data => {
                            <ListItem>
                                <Text>{data}</Text>
                            </ListItem>
                        }}
                        renderLeftHiddenRow={data => {
                            <Button full>
                                <Icon name='information-circle'/>
                            </Button>
                        }}
                        renderRightHiddenRow={data => {
                            <Button full>
                                <Icon name='trash'/>
                            </Button>
                        }}
                        leftOpenValue={-75}
                        rightOpenValue={-75}
                        />
                </Content>
                <Fab 
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="share" />
                    <Button
                        success
                        onPress={() => this.logOut()}
                    >
                        <Icon name='icon-logout'/>
                    </Button>
                </Fab>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
    }
})