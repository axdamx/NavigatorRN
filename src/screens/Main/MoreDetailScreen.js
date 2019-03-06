import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class MoreDetailScreen extends Component {
    render() {
        return (
            <View style={style.container}>
                <Text> GO BACK HOME </Text>
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

export default MoreDetailScreen