import React, { Component } from "react";
import {
    Alert,
    StyleSheet
} from "react-native";
import {Icon, Button,  Label, Container, Content, Form, Item, Input, Text} from 'native-base';
import CustomHeader from "../../../container/header";
import Loading from "../../../container/components/loading";
import HttpClient from "../../../services/client/http-client";
import FieldRequired from "../../../container/components/field-required";
import ImageBackgroundComponent from "../../../container/components/image-background";

class ClientForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            idClient: 0,
            name: "",
            lastName: "",
            cellphone: "",
            identification: "",
            city: "",
            address: "",
            errorMessage: null,
            isAddNew: true,
            titleButton: 'Create Client',
            client: null,
            loading: false
        };
    }   

    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-arrow-back"
                    title = {  'Client' }
                    navigation = { navigation }
                    //hasBackButtom= { props.navigation.state.routes.length > 1 }
                    hasBackButtom= { false }
                />
            )
        }
    }
    
    componentDidMount = () =>{ 
        client = this.props.navigation.getParam('client', 'no-data');
        if( client.idClient > 0 ){
            this.setState({ 
                titleButton: 'Edit Client',
                isAddNew: false,
                idClient: client.idClient,
                name: client.name,
                lastName: client.lastName,
                cellphone: client.cellphone,
                identification: client.identification,
                address: client.address,
                city: client.city,
                loading: false 
            })
        }
    }

    async refreshList (data) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onResult(data);
    }

    validateForm(){
        //Name
        if (this.state.name.trim() == "") {
            Alert.alert("Please enter client name")
            return false;
        }
        if (this.state.name.length > 60) {
            Alert.alert("The name field must have less than 60 characters")
            return false;
        }
        if (this.state.name !="" && this.state.name.length > 60) {
            Alert.alert("The lastName field must have less than 60 characters")
            return false;
        }

        //LastName
        if (this.state.lastName.trim() == "") {
            Alert.alert("Please enter client last name")
            return false;
        }
        if (this.state.lastName.length > 90) {
            Alert.alert("The last name field must have less than 90 characters")
            return false;
        }
        if (this.state.lastName !="" && this.state.name.length > 90) {
            Alert.alert("The last name field must have less than 90 characters")
            return false;
        }
        
        //Cellphone
        if (this.state.cellphone.trim() == "") {
            Alert.alert("Please enter cellphone")
            return false;
        }
        if (this.state.cellphone.length > 11) {
            Alert.alert("The cellphone field must have less than 10 characters")
            return false;
        }
        if (this.state.cellphone !="" && this.state.cellphone.length > 11) {
            Alert.alert("The cellphone field must have less than 10 characters")
            return false;
        }

        //Identification
        if (this.state.identification !="" && this.state.identification.length > 11) {
            Alert.alert("The identification field must have less than 10 characters")
            return false;
        }

        //address
        if (this.state.address.trim() == "") {
            Alert.alert("Please enter address")
            return false;
        }
        if (this.state.address.length > 90) {
            Alert.alert("The address field must have less than 90 characters")
            return false;
        }
        if (this.state.address !="" && this.state.address.length > 90) {
            Alert.alert("The address field must have less than 90 characters")
            return false;
        }

        //City
        if (this.state.city.trim() == "") {
            Alert.alert("Please enter city")
            return false;
        }
        if (this.state.city.length > 90) {
            Alert.alert("The city field must have less than 90 characters")
            return false;
        }
        if (this.state.city !="" && this.state.city.length > 90) {
            Alert.alert("The city field must have less than 90 characters")
            return false;
        }

        return true;
    }

    saveData = async () =>{
        try {
            this.setState({ loading: true });
            const params = {
                idClient: this.state.idClient,
                name: this.state.name,
                lastName: this.state.lastName,
                cellphone: this.state.cellphone,
                identification: this.state.identification,
                address: this.state.address,
                city: this.state.city,
                enable: 'S'
            }
            const data =  params.idClient > 0 ? await HttpClient.updateHttpClient(params): await HttpClient.saveHttpClient(params) ;
            if(data){
                this.setState({ loading: false });
                if(data.errorMessage){
                    alert(data.errorMessage);
                }else{
                    this.refreshList(data);
                }
            }else{
                alert('An error has occurred, try it later');
            }
        } catch (error) {
            this.setState({ loading: false });
            console.log(error);
        }
    }
    render() {
        return (
        <Container>
            <Content>
                { this.state.loading && 
                    <Loading/>
                }
                <Form>
                    <ImageBackgroundComponent/>
                    <Item floatingLabel>
                        <Label style={styles.text} >Client name <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={60}
                            onChangeText={ (name) => { this.setState({ name })  } }
                            value= {this.state.name} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Client lastName <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={90}
                            multiline = {false}
                            onChangeText={ (lastName) => { this.setState({ lastName })  } }
                            value= {this.state.lastName} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Client cellphone <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={90}
                            keyboardType = 'numeric'
                            onChangeText={ (cellphone) => { this.setState({ cellphone })  } }
                            value= {this.state.cellphone} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Client identification</Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            keyboardType = "numeric"
                            maxLength={90}
                            onChangeText={ (identification) => { this.setState({ identification })  } }
                            value= {this.state.identification} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Client address <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={60}
                            onChangeText={ (address) => { this.setState({ address })  } }
                            value= {this.state.address} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Client city <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={45}
                            onChangeText={ (city) => { this.setState({ city })  } }
                            value= {this.state.city} />
                    </Item>
                    <Button full
                        onPress={() => {
                            if(this.validateForm()){
                                this.saveData();
                            }
                        }}>
                    <Icon name='ios-checkmark-circle' />
                    <Text style={styles.text}> { this.state.titleButton }</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: "IndieFlower"
    }
});
export default ClientForm;