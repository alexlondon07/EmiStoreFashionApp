import React from 'react';
import {
    ImageBackground, StyleSheet
} from "react-native";
import HttpProduct from '../../services/product/http-product';

const ImageBackgroundComponent = props => {
    return(
        <ImageBackground
        source={  props.image == null || props.image == ""  ? require('../../../assets/background.png') : { uri: HttpProduct.getUrlImage(props.id) }  }
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
