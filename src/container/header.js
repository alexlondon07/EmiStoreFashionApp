import React, { Component } from 'react';
import { Header, Left, Icon, Button, Body , Title} from 'native-base';

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
                    <Title> { title }</Title>
                </Body>
            </Header>
        );
    }
}
export default CustomHeader;
