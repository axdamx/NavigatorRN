import React, { Component } from 'react'
import firebase from 'firebase'
import { View, Text, Button } from 'react-native'

class DashboardSettings extends Component {

    signOutUser = () => {
        firebase.auth().signOut().then(function () {
            this.props.navigation.navigate('WelcomeScreen')
        }).catch(function (error) {

        })
    }
    render() {
        return (
            <View style={style.container}>
                <Text> Settings </Text>
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

export default DashboardSettings