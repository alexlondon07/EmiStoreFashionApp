import React from 'react';
import { Icon, Button } from 'native-base';

const BackButton = props => (
    <Button
    transparent
    onPress= { ()=> props.navigation.goBack(null) }
    >
    <Icon name= "ios-arrow-back"/>
    </Button>
);

export default BackButton;
