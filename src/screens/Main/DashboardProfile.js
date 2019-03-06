import React, { Component } from 'react'
import firebase from 'firebase'
import {
    View,
    Text,
    Button,
    Image,
    Alert
} from 'react-native'

class DashboardProfile extends Component {

    //didMount cant run
    state = {
        currentUser: null,
        email: '',
        username: '',
        profilePhoto: '',
        dataSource: []
    }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.readOnlyUser()
    }

    getOwnAdsDataFromFirebase = () => {
        firebase.database().ref('Ads/' + currentUser.uid)
            .on('value', (snapshot) => {
                if (snapshot.val()) {
                    this.setState({
                        dataSource: Object.values(snapshot.val())
                    })
                }
            })
    }

    signOutUser = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                { text: 'No' },
                {
                    text: 'Yes', onPress: () =>
                        firebase
                            .auth()
                            .signOut()
                            .then(function () {
                                alert('Succesfully Logged Out!')
                                this.props.navigation.navigate('WelcomeScreen')
                            })
                            .catch(function (error) {
                            })
                },
            ],
            { cancelable: false }
        );
    }

    readOnlyUser = () => {
        var that = this;
        firebase.auth().onAuthStateChanged(function (currentUser) {
            if (currentUser) {
                firebase.database().ref('users/' + currentUser.uid)
                    .once('value')
                    .then(snapshot => {
                        that.setState({
                            email: snapshot.val().email,
                            username: snapshot.val().username,
                            profilePhoto: snapshot.val().profilePhoto.uri
                        });
                    })
                    .catch(error => {
                        console.log('There has been a problem with your fetch operation: ' + error.message);
                    });
            }
        })
    }

    render() {
        const { currentUser } = this.state
        return (
            <View style={style.container}>
                <View style={{
                    backgroundColor: 'lightgray',
                    width: '100%',
                    alignItems: 'center',
                    padding: 10,
                    height: 250
                }}>
                    <Image
                        source={{ uri: this.state.profilePhoto }}
                        style={{
                            width: 150,
                            height: 150,
                            borderRadius: 150 / 2,
                            overflow: "hidden",
                            borderWidth: 0.5,
                            borderColor: "black",
                            marginBottom: 30
                        }}
                    />
                    <Text> EMAIL : {this.state.email} </Text>
                    <Text> USERNAME : {this.state.username} </Text>
                </View>
                <View style={{ flex: 1 }}>
                </View>
                <Button title='Log Out'
                    onPress={() => this.signOutUser()}
                />
            </View>
        )

    }
}

const style = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
}

export default DashboardProfile