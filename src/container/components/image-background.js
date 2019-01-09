import React from 'react';
import {
    ImageBackground, StyleSheet
} from "react-native";
import HttpProduct from '../../services/product/http-product';

const ImageBackgroundComponent = props => {
    return(
        <ImageBackground
        source={  props.item > 0 ? { uri: HttpProduct.getUrlImage(props.item) } :  require('../../../assets/clients.png')  }
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
