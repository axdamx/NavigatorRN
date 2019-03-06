import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native'

const Card = () => {
    return (
        <View style={{ padding: 5, borderWidth: 1, borderColor: 'black', borderRadius: 5, marginBottom: 10 }}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Detail', { text: item.title })}>
                <Image
                    style={{ width: null, height: 200 }}
                    source={{ uri: item.photo.uri }} />
                <View style={{ backgroundColor: 'pink', padding: 10 }}>
                    <Text>
                        {item.title}
                    </Text>
                    <Text>
                        RM{item.price}
                    </Text>
                    <Text>
                        {item.category}
                    </Text>
                    <Text>
                        {item.condition}
                    </Text>
                    <Text>
                        {item.description}
                    </Text>
                    <Text>
                        By:{item.username}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Card