import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, Card, CardItem, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import CustomHeader from '../../container/header';

class Home extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-menu"
                    title = { 'Home' }
                    navigation = { navigation }
                    hasBackButtom= { true }
                />
            )
        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <Container>
                <Content>
                <Card>
                    <CardItem>
                        <Icon name="logo-googleplus"/>
                        <Text>Google Plus</Text>
                        <Right>
                        <Icon name="arrow-forward"/>
                        </Right>
                    </CardItem>
                </Card>
                </Content>
                <Footer>
                    <Text>Footer</Text>
                </Footer>
            </Container>
        );
    }
}

export default Home;