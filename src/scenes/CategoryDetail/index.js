import React, { Component } from "react";
import {
    Alert
} from "react-native";
import {Icon, Button,  Label, Container, Content, Form, Item, Input, Text} from 'native-base';

import HttpCategory from "../../services/category/http-category";
import CustomHeader from '../../container/header';

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            idCategory: 0,
            name: "",
            description: "",
            errorMessage: null,
            isAddNew: true,
            titleButton: 'Create Category',
            category: null
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
        if( category.idCategory > 0 ){
            this.setState({ 
                titleButton: 'Edit Category',
                isAddNew: false,
                idCategory: category.idCategory,
                name: category.name,
                description: category.description 
            })
        }
        console.log('data in componentDidMount: ' +category)
    }

    goBackPreviewScreen (data) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onResult(data)
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

    saveDataCategory = async () =>{
        try {
            const params = {
                idCategory: this.state.idCategory,
                name: this.state.name,
                description: this.state.description,
                enable: 'S'
            }
            const data =  await params.idCategory > 0 ? HttpCategory.updateHttpCategory(params):  HttpCategory.saveHttpCategories(params) ;
            if(data){
                if(data.errorMessage){
                    alert(data.errorMessage);
                }else{
                    const msj = 'Category successfully';
                    params.idCategory > 0 ? alert(msj+ ' updated'): alert(msj+' created');
                    this.goBackPreviewScreen(data);
                }
            }else{
                alert('An error has occurred, try it later');
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
        <Container>
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Category name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={45}
                            autoFocus = {true}
                            onChangeText={ (name) => { this.setState({ name })  } }
                            value= {this.state.name} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Category description</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={90}
                            multiline = {true}
                            onChangeText={ (description) => { this.setState({ description })  } }
                            value= {this.state.description} />
                    </Item>
                    <Button full
                        onPress={() => {
                            if(this.validateForm()){
                                this.saveDataCategory();
                            }
                        }}>
                    <Icon name='ios-checkmark-circle' />
                    <Text> { this.state.titleButton }</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
        );
    }
}

export default CategoryDetail;