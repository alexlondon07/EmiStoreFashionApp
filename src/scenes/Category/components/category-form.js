import React, { Component } from "react";
import {
    Alert,
    StyleSheet
} from "react-native";
import axios from 'axios';
import { Button,  Label, Container, Content, Form, Item, Input, Text} from 'native-base';
import CustomHeader from "../../../container/header";
import Loading from "../../../container/components/loading";
import FieldRequired from "../../../container/components/field-required";
import ImageBackgroundComponent from "../../../container/components/image-background";
import { MESSAGES } from "../../../util/constants";
import { BASE_API, HTTP_CATEGORY } from "../../../services/config";
import { Keyboard } from 'react-native'


class CategoryForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            ideCategory: 0,
            name: "",
            description: "",
            errorMessage: null,
            isAddNew: true,
            titleButton: 'Create Category',
            category: null,
            loading: false,
            imageBackground: '../../../../assets/logo/photo_facebook.png'
        };
    }   

    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-arrow-back"
                    title = {  'Category' }
                    navigation = { navigation }
                    //hasBackButtom= { props.navigation.state.routes.length > 1 }
                    hasBackButtom= { false }
                />
            )
        }
    }
    
    componentDidMount = () =>{ 
        category = this.props.navigation.getParam('category', 'no-data');
        if( category.ideCategory > 0 ){
            this.setState({ 
                titleButton: 'Edit Category',
                isAddNew: false,
                ideCategory: category.ideCategory,
                name: category.name,
                description: category.description,
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
        if (this.state.name.trim() == "") {
            Alert.alert("Please enter category name")
            return false;
        }
        if (this.state.name.length > 46) {
            Alert.alert("The name field must have less than 45 characters")
            return false;
        }
        if (this.state.name !="" && this.state.name.length > 90) {
            Alert.alert("The description field must have less than 90 characters")
            return false;
        }
        return true;
    }

    /**
     * Method to save or update category
     */
    saveDataCategory = async () =>{
        this.setState({ loading: true });
        const update  = this.state.ideCategory > 0 ? 'PATCH' : 'POST';
        const request = update === 'PATCH' ? `${ BASE_API }${ HTTP_CATEGORY.updateCategory }${ this.state.ideCategory }` : `${ BASE_API }${ HTTP_CATEGORY.saveCategory }`;            

        // Send request
        axios({
            method: update,
            url: request,
            data: {
                ideCategory: this.state.ideCategory,
                name: this.state.name,
                description: this.state.description,
                enable: 'S'
            }
        }).then(response => {
            this.setState({ loading: false });
            if(response.data.errorMessage){
                alert(response.data.errorMessage);
            }else{
                this.refreshList(response.data);
            }
        }).catch(error => {
            console.log(error);
            alert( MESSAGES.error );
        });

    }
    render() {
        return (
        <Container>
            <Content>
                { this.state.loading && 
                    <Loading/>
                }
                <Form>
                    <ImageBackgroundComponent />
                    <Item floatingLabel>
                        <Label style={styles.text} >Category name <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={45}
                            autoFocus = {true}
                            onChangeText={ (name) => { this.setState({ name })  } }
                            value= {this.state.name} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Category description</Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={90}
                            multiline = {true}
                            onChangeText={ (description) => { this.setState({ description })  } }
                            value= {this.state.description} />
                    </Item>
                    <Label style={styles.text}></Label>
                    <Button full
                        onPress={() => {
                            if(this.validateForm()){
                                this.saveDataCategory();
                            }
                        }}>
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
    },
    error:{
        fontSize: 14,
        fontFamily: "IndieFlower",
        color: 'red',
        alignContent: 'center',
        alignItems: 'center',

    }
});
export default CategoryForm;