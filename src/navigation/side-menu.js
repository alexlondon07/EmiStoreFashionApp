import React, { Component } from 'react'
import { 
    ImageBackground,
    StyleSheet,
    Image
} from 'react-native';
import { Container, Content, List, ListItem, Left, Icon, Text, Right } from 'native-base';

const routes = [
    {
        screen: 'HomeScreen',
        title: 'Home',
        icon: 'ios-home'
    },
    {
        screen: 'CategoryScreen',
        title: 'Categories',
        icon: 'ios-list-box'
    },
    {
        screen: 'ClientScreen',
        title: 'Clients',
        icon: 'ios-contacts'
    },
    {
        screen: 'ProductScreen',
        title: 'Products',
        icon: 'ios-cube'
    },
    {
        screen: 'SettingsScreen',
        title: 'Settings',
        icon: 'ios-settings'
    }
];

class SideMenu extends Component {
    render() {
        const { navigation } = this.props;
        return (
        <Container>
            <Content> 
                <ImageBackground
                    source={require('../../assets/background.png')}
                    style = { styles.imageBackground }
                >
                <Image
                    source={require('../../assets/logo/photo_facebook.png')}
                    style = { styles.avatar }
                />
                </ImageBackground>
                <List 
                    dataArray = { routes }
                    renderRow = { item =>{
                        return(
                            <ListItem
                                button
                                onPress = { () => navigation.navigate( item.screen )}
                            >
                                <Left>
                                    <Icon name = { item.icon } />
                                    <Text style={ styles.textOption }> { item.title } </Text>
                                </Left>
                                <Right>
                                    <Icon name = "arrow-forward" />
                                </Right>
                            </ListItem>
                        );
                    }}
                />
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        height: 140,
        justifyContent: 'center', //Centrar Verticalmente
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    textOption:{
        fontSize: 18,
        fontFamily: "IndieFlower"
    }
});

export default SideMenu;