import React, { Component } from 'react';
import { Header, Left, Icon, Button, Body , Title, Right} from 'native-base';

class CustomHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { navigation, title, nameIcon, isHome } = this.props;
        return (
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress= { (isHome) ? ()=> navigation.openDrawer(): ()=>navigation.goBack(null)}
                    >
                    <Icon name= { nameIcon }/>
                    </Button>
                </Left>
                <Body>
                    <Title>{ title }</Title>
                </Body>
                <Right>
                    {/* <Button 
                        transparent
                        onPress={ ()=> navigation.navigate('CategoryDetailScreen', { onResult: this.props.onResult }) }>
                        <Icon name= { 'ios-add-circle' }/>
                    </Button> */}
                </Right>
            </Header>
        );
    }
}
export default CustomHeader;
