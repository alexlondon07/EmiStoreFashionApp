import React from 'react';
import {
    Text,
    View,
    StyleSheet ,
    TouchableHighlight,
    Alert
} from 'react-native';

const ItemCategory = (props) => (
    <TouchableHighlight
        //onPress = { ()=> props.navigation.navigate('CategoryDetailScreen',  { onResult: this.onResult } ) }
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
    },
    description:{
        color: '#6b6b6b',
        fontSize: 12,
    }
});

export default ItemCategory;
