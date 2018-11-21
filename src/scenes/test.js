import React from 'react';
import { View , StyleSheet } from 'react-native';
import { Badge, Icon, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const Test =  props => (
    <View style ={ styles.container }>
        <Button iconLeft transparent primary>
            <Icon name='md-cart' />
            <Badge>
                <Text> { props.getCategoriesItems.size } </Text>
            </Badge>
        </Button>        
    </View>
);

const mapDispatchToProsp = ( state ) => {
    return {
        getCategoriesItems: state.get('categories').toArray()//replace toJS method
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 5
    },
    badget: {
        position: 'absolute',
        height: 30,
        width: 30,
        borderRadius: 15,
        backgroundColor: 'red',
        right: 15, 
        bottom: 15,
        alignItems: 'center',
        zIndex: 1000
    },
    badgetText: {
        fontWeight: 'bold',
    }
})


export default connect(mapDispatchToProsp, null)(withNavigation(Test));
