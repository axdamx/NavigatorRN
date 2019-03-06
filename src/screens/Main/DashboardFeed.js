import React, { Component } from 'react'
import firebase from 'firebase'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native'

class DashboardFeed extends Component {
    state = {
        currentUser: null,
        dataSource: []
    }
    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.getAdsDataFromFirebase()
    }
    getAdsDataFromFirebase = () => {
        firebase.database().ref('Ads/')
            .on('value', (snapshot) => {
                if (snapshot.val()) {
                    this.setState({
                        dataSource: Object.values(snapshot.val())
                    })
                }
            })
    }

    renderItem = ({ item }) => {
        return (
            <View style={{ padding: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5, marginBottom: 10 }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Detail', {
                        textTitle: item.title,
                        imageUri: item.photo.uri,
                        conditionTitle: item.condition,
                        categoryTitle: item.category,
                        brandTitle: item.brand,
                        locationTitle: item.location,
                        priceTitle: item.price,
                        descriptionTitle: item.description,
                        usernameTitle: item.username
                    })}>
                    <Image
                        style={{ width: null, height: 180 }}
                        source={{ uri: item.photo.uri }} />
                    <View style={{ flex: 1, padding: 10 }}>
                        <Text style={{ color: 'blue', fontSize: 20, padding: 5 }}>
                            {item.title}
                        </Text>
                        <Text style={{ fontSize: 15, padding: 5 }}>
                            {item.location}
                        </Text>
                        <Text style={{ fontSize: 15, padding: 5 }}>
                            By: {item.username}
                        </Text>
                        <Text style={{ fontSize: 15, padding: 5 }}>
                            Category: {item.category}
                        </Text>
                        <Text style={{ color: 'green', fontSize: 20, padding: 5 }}>
                            RM{item.price}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { currentUser, dataSource } = this.state
        console.log(dataSource)
        return (
            <View style={style.container}>
                {/* <Text>
                    Hi {currentUser && currentUser.email}
                </Text> */}
                <View style={{ flex: 1, width: '100%', padding: 10, height: 100 }}>
                    {dataSource.length === 0 ? <Text>No post found</Text> : <FlatList
                        data={dataSource}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.description} />}
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
    }
}

export default DashboardFeed