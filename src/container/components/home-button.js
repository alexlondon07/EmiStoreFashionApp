import React from 'react';
import { Icon, Button } from 'native-base';

const HomeButton = props => (
    <Button
    transparent
    onPress= { ()=> props.navigation.openDrawer() }
    >
    <Icon name= "menu"/>
    </Button>
);

export default HomeButton;
