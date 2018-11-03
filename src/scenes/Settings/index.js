import React, { Component } from 'react'
import { Text, Container, Content} from 'native-base';
import CustomHeader from '../../container/header';

class Settings extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-menu"
                    title = { 'Settings' }
                    navigation = { navigation }
                    hasBackButtom= { false }
                    //hasBackButtom= { props.navigation.state.routes.length > 1 }
                />
            )
        }
    }

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
        return (
        <Container>
            <Content>
                <Text> Configuración </Text>
            </Content>
        </Container>
        )
    }
}
export default Settings;