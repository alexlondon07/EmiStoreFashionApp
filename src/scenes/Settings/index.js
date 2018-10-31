import React, { Component } from 'react'
import { Text, Container, Content} from 'native-base';
import CustomHeader from '../../container/header';


class Settings extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <CustomHeader
                    title = "Configuración"
                    nameIcon = "ios-settings"
                    isHome = {true}
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