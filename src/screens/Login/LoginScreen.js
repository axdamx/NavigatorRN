import React, { Component } from 'react'
import firebase from 'firebase'
import {
    View,
    Image,
    Text,
    Alert
} from 'react-native'
import { TextField } from 'react-native-material-textfield'
import { RaisedTextButton } from 'react-native-material-buttons'


class LoginScreen extends Component {

    state = {
        email: '',
        password: '',
        errorMessage: null
    }

    handleLogin = () => {
        // var that = this
        const { email, password } = this.state
        if (email === "") {
            alert('Please insert your email')
        } else if (password === "") {
            alert('Please insert your password')
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(function () {
                    alert('Succesfully Logged In!')
                    this.props.navigation.navigate('Dashboard')
                })
                // .catch(function (error) {
                //     that.setState({ errorMessage: error.message })
                //     alert(error)
                // })
                //.then(() => this.props.navigation.navigate('Dashboard'))
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    render() {

        return (
            <View style={style.container}>
                {/* <Image source={require('/Users/adamode/reactProject/Navigator/src/images/logo/palaceLogo.png')}
                    style={style.imageLogo} /> */}
                <View style={style.formContainer}>
                    <View style={{ padding: 10 }}>
                        {this.state.errorMessage && <Text style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </Text>}
                        <TextField
                            label='Email'
                            value={this.state.email}
                            returnKeyType='next'
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </View>
                    <View style={{ padding: 10 }}>
                        <TextField
                            label='Password'
                            value={this.state.password}
                            returnKeyType='next'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </View>
                </View>
                <View style={style.buttonContainer}>
                    <RaisedTextButton
                        title='Login'
                        titleColor='white'
                        onPress={() => this.handleLogin()}
                        color='#2F95D6'
                        style={{ margin: 10 }}
                    />
                    <RaisedTextButton
                        title='Sign Up'
                        titleColor='white'
                        onPress={() => this.props.navigation.navigate('SignUpScreen')}
                        color='#2F95D6'
                        style={{ margin: 10 }}

                    />
                </View>
            </View>
        )
    }
}

const style = {
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    formContainer: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        padding: 10
    },
    imageLogo: {
        width: 200,
        height: 200,
        margin: 20
    },
}

export default LoginScreen