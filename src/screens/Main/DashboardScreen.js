import React, { Component } from 'react'
import { View, Text } from 'react-native'

class DashboardScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text> Dashboard Screen </Text>
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

export default DashboardScreen