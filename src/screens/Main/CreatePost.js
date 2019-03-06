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

class CreatePost extends Component {

    state = {
        title: '',
        description: '',
        price: '',
        category: '',
        condition: '',
        brand: '',
        photo: null,
        currentUser: null,
        username: '',
        email: '',
        location: ''
    }

    componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.getUserDetailsAtCreate()
    }

    // handleChoosePhoto = async () => {
    //     let result = await ImagePicker.launchCamera();
    //     if (!result.cancelled) {
    //         this.uploadImage(result.uri, 'test-image')
    //             .then(() => {
    //                 alert('Succes')
    //             })
    //             .catch((error) => {
    //                 alert(error)
    //             })
    //     }
    // }

    // uploadImage = async (uri, imageName) => {
    //     const response = await fetch(uri);
    //     const blob = await response.blob();

    //     var ref = firebase.storage().ref().child('images/' + imageName);
    //     return ref.put(blob);

    // }

    handleChoosePhoto = () => {
        const options = {
            noData: true
        }
        ImagePicker.launchImageLibrary(options, response => {
            console.log('response', response)
            if (response.uri) {
                this.setState({ photo: response })
            }
        })
    }

    createPost = () => {
        const { title, location, description, price, category, condition, brand, photo, username, email } = this.state
        if (title === "") {
            alert('Please insert your title')
        } else if (price === "") {
            alert('Please insert your price')
        } else if (category === "") {
            alert('Please insert your category')
        } else if (brand === "") {
            alert('Please insert your brand')
        } else if (photo == null) {
            alert('Please choose your photo')
        } else if (description === "") {
            alert('Please insert your description')
        } else if (condition === "") {
            alert('Please insert your condition')
        } else if (location === "") {
            alert('Please insert your location')
        } else {
            firebase.database().ref('Ads/').push({
                title,
                description,
                price,
                category,
                condition,
                brand,
                photo,
                username,
                email,
                location
            }).then((data) => {
                alert('Your post has been succesfully added!')
                this.setState({
                    title: '',
                    description: '',
                    price: '',
                    category: '',
                    condition: '',
                    brand: '',
                    photo: null,
                    currentUser: null,
                    username: '',
                    email: '',
                    location: ''
                })
                this.props.navigation.navigate('DashboardFeed')
            }).catch((error) => {
                console.log('error', error)
            })
        }
    }

    getUserDetailsAtCreate = () => {
        var that = this;
        firebase.auth().onAuthStateChanged(function (currentUser) {
            if (currentUser) {
                firebase.database().ref('users/' + currentUser.uid)
                    .once('value')
                    .then(snapshot => {
                        that.setState({
                            email: snapshot.val().email,
                            username: snapshot.val().username,
                        });
                    })
                    .catch(error => {
                        console.log('There has been a problem with your fetch operation: ' + error.message);
                    });
            }
        })
    }

    render() {
        //const { currentUser } = this.state

        const categoryData = [
            { value: 'Mountain Bikes' },
            { value: 'Road Bikes' },
            { value: 'Foldable Bikes' },
            { value: 'Accesories' },
            { value: 'Others' }]

        const locationData = [
            { value: 'Johor' },
            { value: 'Kedah' },
            { value: 'Kelantan' },
            { value: 'Melaka' },
            { value: 'Negeri Sembilan' },
            { value: 'Pahang' },
            { value: 'Pulau Pinang' },
            { value: 'Perak' },
            { value: 'Perlis' },
            { value: 'Terengganu' },
            { value: 'Sabah' },
            { value: 'Serawak' },
            { value: 'Selangor' },
            { value: 'Wilayah Persekutuan Kuala Lumpur' },
            { value: 'Wilayah Persekutuan Labuan' },
            { value: 'Wilayah Persekutuan Putrayaja' },
        ]

        const conditionData = [
            { value: 'New' },
            { value: 'Used' }]

        const brandData = [
            { value: 'Giant' },
            { value: 'GT Bikes' },
            { value: 'Santa Cruz' },
            { value: 'Trek' },
            { value: 'Specialized' },
            { value: 'Cannondale' },
            { value: 'Marin Cycles' },
            { value: 'Yeti Cycles' },
            { value: 'Kona Bicycles' },
            { value: 'Merida Bikes' },
            { value: 'Others' }]

        const { location, title, description, price, category, condition, brand, photo, email, username } = this.state

        return (
            <View style={style.container}>
                <ScrollView scrollEventThrottle={16}
                    style={{ width: '100%' }}>
                    <View style={style.viewHeaderStyle}>
                        {/* <Text>
                            Hi {currentUser && currentUser.uid}
                        </Text>
                        <Text> EMAIL :  </Text>
                        <Text>  {email} </Text>
                        <Text> USERNAME :  </Text>
                        <Text> {username}  </Text> */}
                        <Text style={{ fontSize: 20, marginBottom: 5 }}> Create a New Post </Text>
                        <Text style={{ fontSize: 10 }}> Adverts must comply to the Posting Rules</Text>
                    </View>
                    <View style={style.viewTitleStyle}>
                        <TextField
                            label='Title'
                            value={title}
                            returnKeyType='next'
                            onChangeText={(title) => this.setState({ title })}
                        />
                        <TextField
                            label='Description'
                            value={description}
                            multiline={true}
                            numberOfLines={4}
                            height={150}
                            onChangeText={(description) => this.setState({ description })}
                        />
                        <Dropdown label='Category'
                            value={this.state.category}
                            data={categoryData}
                            onChangeText={(category) => this.setState({ category })}
                        />
                        <TextField
                            label='Price'
                            value={price}
                            returnKeyType='next'
                            onChangeText={(price) => this.setState({ price })}
                        />
                        <Dropdown label='Condition'
                            data={conditionData}
                            onChangeText={(condition) => this.setState({ condition })}
                        />
                        <Dropdown label='Brand'
                            data={brandData}
                            onChangeText={(brand) => this.setState({ brand })}
                        />
                        <Dropdown label='Location'
                            data={locationData}
                            onChangeText={(location) => this.setState({ location })}
                        />

                        <View style={{
                            marginTop: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            {photo && (
                                <Image
                                    source={{ uri: photo.uri }}
                                    style={{ width: 300, height: 300, marginBottom: 20 }} />
                            )}
                            <RaisedTextButton
                                title='Choose Photo'
                                titleColor='white'
                                onPress={this.handleChoosePhoto}
                                color='#2F95D6'
                            />
                        </View>
                    </View>
                    <View style={{ padding: 10 }}>
                        <RaisedTextButton
                            title='Post This Ad'
                            titleColor='white'
                            onPress={this.createPost}
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
    viewInputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        padding: 5,
        marginBottom: 20
    }
}

export default CreatePost