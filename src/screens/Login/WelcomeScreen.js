import React, { Component } from 'react'
import {
    View,
    Image,
    ActivityIndicator,
    Text
} from 'react-native'
import firebase from 'firebase'
import { RaisedTextButton } from 'react-native-material-buttons'

class WelcomeScreen extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'DashboardFeed' : 'LoginScreen')
        })
    }
    render() {
        return (
            <View style={style.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
                <View style={style.imageContainer}>
                    <Image source={require('/Users/adamode/reactProject/Navigator/src/images/logo/palaceLogo.png')}
                        style={style.imageLogo} />
                </View>
                <View style={style.button}>
                    <RaisedTextButton
                        title='Login'
                        titleColor='white'
                        onPress={() => this.props.navigation.navigate('LoginScreen')}
                        color='#2F95D6'
                    />
                </View>
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
    button: {
        position: 'absolute',
        bottom: 20,
        padding: 10,
        width: '100%',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        padding: 10,
        margin: 10,
        fontSize: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 15,
    },
    imageLogo: {
        width: 250,
        height: 250,
    },
    imageContainer: {

    }

}

export default WelcomeScreen