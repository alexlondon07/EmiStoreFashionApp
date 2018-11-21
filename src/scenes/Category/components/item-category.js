import React from 'react';
import {
    Text,
    View,
    StyleSheet ,
    TouchableHighlight,
} from 'react-native';

const ItemCategory = (props) => (
    <TouchableHighlight
        onPress = { ()=> props.navigation.navigate('CategoryFormScreen',  { onResult: props.onResult, category: props.category } ) }
        underlayColor = "#ccc">
        <View style={styles.container}>
            <Text style={ styles.name }>{ props.category.name }</Text>
            <Text style={ styles.description }>{ props.category.description }</Text>
        </View>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderColor: 'red',
    },
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
