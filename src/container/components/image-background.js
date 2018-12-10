import React from 'react';
import {
    ImageBackground, StyleSheet
} from "react-native";

const ImageBackgroundComponent = props => {
    //const image = props.image ? props.image : '../../../assets/background.png';
    return(
        <ImageBackground
        source={require('../../../assets/clients.png')}
        style = { styles.imageBackground }>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    imageBackground: {
        height: 120,
        justifyContent: 'center', //Centrar Verticalmente
        alignItems: 'center',
    },
});
export default ImageBackgroundComponent;
