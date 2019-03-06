import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

const LogInButton = () => {
    return (
        <View style={style.button}>
            {/* <Button title='Login'
            onPress={() => this.props.navigation.navigate('LoginScreen')}
            style={{ textAlign: 'center' }} /> */}
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('LoginScreen')}>
                <Text style={style.buttonText}>
                    {this.props.loginButtonText}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const style = {
    button: {
        position: 'absolute',
        bottom: 0,
        padding: 10,
        backgroundColor: 'blue',
        width: '100%',
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        padding: 15,
        fontSize: 20
    }
}

export default LogInButton