import React from 'react';
import {
    Text,
    View,
    StyleSheet ,
    TouchableHighlight,
} from 'react-native';

const ItemCategory = (props) => (
    <TouchableHighlight
        onPress = { ()=> props.navigation.navigate('CategoryDetailScreen',  { onResult: props.onResult, category: props.category } ) }
        underlayColor = "#ccc">
        <View>
            <Text style={ styles.name }>{ props.category.name }</Text>
            <Text style={ styles.description }>{ props.category.description }</Text>
        </View>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    name:{
        color: '#6b6b6b',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10
    },
    description:{
        color: '#6b6b6b',
        fontSize: 12,
        marginLeft: 10
    }
});

export default ItemCategory;
