import React, { Component } from 'react'
import firebase from 'firebase'
import {
    View,
    Text,
    ScrollView,
    Image
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import { TextField } from 'react-native-material-textfield'
import ImagePicker from 'react-native-image-picker'
import { RaisedTextButton } from 'react-native-material-buttons'

class SignUpScreen extends Component {

    state = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        profilePhoto: null,
        errorMessage: null
    }

    handleSignUp = () => {
        const { email, password, username, profilePhoto } = this.state
        if (email === "") {
            alert('please enter your email')
        } else if (password === "") {
            alert('please enter your password')
        } else if (username === "") {
            alert('please enter your username')
        } else if (profilePhoto == null) {
            alert('please choose your photo')
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((res) => {
                    firebase.database().ref('users/' + res.user.uid).set({
                        email: email,
                        username: username,
                        password: password,
                        profilePhoto: profilePhoto
                    })
                })
                .then(function () {
                    alert('Succesfully Signed Up!')
                    this.props.navigation.navigate('Dashboard')
                }).catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    handleChooseProfilePhoto = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ profilePhoto: response })
            }
        })
    }

    render() {

        const { errorMessage, profilePhoto, email, username, password, confirmPassword } = this.state

        return (
            <View style={style.container}>
                <ScrollView scrollEventThrottle={16}
                    style={{ width: '100%' }}>
                    <View style={style.viewHeaderStyle}>
                        <Text style={{ fontSize: 20, marginBottom: 5 }}> Sign Up  </Text>
                    </View>
                    <View style={style.viewTitleStyle}>
                        {errorMessage && <Text style={{ color: 'red', marginBottom: 10 }}>
                            {errorMessage}
                        </Text>}
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {profilePhoto && (
                                <Image
                                    source={{ uri: profilePhoto.uri }}
                                    style={{ width: 150, height: 150, marginBottom: 20 }} />
                            )}
                            <RaisedTextButton
                                title='Choose Profile Photo'
                                titleColor='white'
                                onPress={this.handleChooseProfilePhoto}
                                color='#2F95D6'
                            />
                        </View>
                        <TextField
                            label='Email'
                            value={email}
                            returnKeyType='next'
                            onChangeText={(email) => this.setState({ email })}
                        />
                        <TextField
                            label='Username'
                            value={username}
                            returnKeyType='next'
                            onChangeText={(username) => this.setState({ username })}
                        />
                        <TextField
                            label='Password'
                            value={password}
                            returnKeyType='next'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                        />
                        <TextField
                            label='Confirm Password'
                            value={confirmPassword}
                            returnKeyType='next'
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                        />
                    </View>
                    <View style={style.button}>
                        <RaisedTextButton
                            title='Sign Up'
                            titleColor='white'
                            onPress={() => this.handleSignUp()}
                            color='#2F95D6'
                        />
                    </View>

                </ScrollView>
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
    },
    viewHeaderStyle: {
        alignSelf: 'flex-start',
        fontSize: 20,
        padding: 10,
        width: '100%'
    },
    viewTitleStyle: {
        flex: 1,
        padding: 10
    },
    button: {
        padding: 10
    }
}

export default SignUpScreen