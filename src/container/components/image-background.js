import React from 'react';
import {
    ImageBackground, StyleSheet
} from "react-native";
import { BASE_API, HTTP_PRODUCT } from '../../services/config';

const ImageBackgroundComponent = props => {
    return(
        <ImageBackground
        source={  props.image == null || props.image == ""  ? require('../../../assets/clients.png') : { uri: `${ BASE_API }${ HTTP_PRODUCT.getImage }${ props.id }${ '/images' }` }  }
        style = { styles.imageBackground }>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    imageBackground: {
        height: 160,
        justifyContent: 'center', //Centrar Verticalmente
        alignItems: 'center',
    },
});
export default ImageBackgroundComponent;
