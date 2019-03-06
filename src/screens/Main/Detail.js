import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
    ScrollView
} from 'react-native'

class Detail extends Component {
    render() {
        const { textTitle, imageUri, conditionTitle, categoryTitle, usernameTitle, brandTitle, locationTitle, priceTitle, descriptionTitle } = this.props.navigation.state.params
        return (
            <View style={style.container}>
                <ScrollView scrollEventThrottle={16}
                    style={{ width: '100%' }}>
                    <View style={{ flex: 1, width: '100%' }}>
                        <Image
                            source={{ uri: imageUri }}
                            style={{
                                width: '100%',
                                height: 200
                            }}
                        />
                    </View>
                    <View style={{ flex: 1, padding: 5 }}>
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>{textTitle} </Text>
                            <Text style={{ fontSize: 20 }}> Price: {priceTitle} </Text>
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <Text style={{ padding: 10 }}> Condition: {conditionTitle} </Text>
                        <Text style={{ padding: 10 }}> Category: {categoryTitle} </Text>
                        <Text style={{ padding: 10 }}> Brand:{brandTitle} </Text>
                        <Text style={{ padding: 10 }}> Location:{locationTitle} </Text>
                        <Text style={{ padding: 10 }}> Posted by: {usernameTitle} </Text>
                        <Text style={{ padding: 10 }}> Description: </Text>
                        <Text style={{ padding: 10 }}> {descriptionTitle} </Text>

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
    }
}

export default Detail