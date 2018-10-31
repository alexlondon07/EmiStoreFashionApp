import React, { Component } from 'react';
import { Header, Left,Body , Title, Right} from 'native-base';
import BackButton from './back-button';
import HomeButton from './home-button';

const CustomHeader =  props =>{ 
    const { navigation } = props;
    return (
        <Header>
            <Left>
                { props.hasBackButtom ? 
                    <BackButton navigation = { navigation }/>
                    :  
                    <HomeButton navigation = { navigation} /> 
                }
            </Left>
            <Right>
                <Body>
                    <Title> { props.title }</Title>
                </Body>
            </Right>
        </Header>
    );
}
export default CustomHeader;
