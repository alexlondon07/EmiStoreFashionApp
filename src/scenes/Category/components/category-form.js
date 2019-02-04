import React, { Component } from "react";
import {
    Alert,
    StyleSheet
} from "react-native";
import {Icon, Button,  Label, Container, Content, Form, Item, Input, Text} from 'native-base';
import HttpCategory from "../../../services/category/http-category";
import CustomHeader from "../../../container/header";
import Loading from "../../../container/components/loading";
import FieldRequired from "../../../container/components/field-required";
import ImageBackgroundComponent from "../../../container/components/image-background";

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

    saveDataCategory = async () =>{
        try {
            this.setState({ loading: true });
            const params = {
                ideCategory: this.state.ideCategory,
                name: this.state.name,
                description: this.state.description,
                enable: 'S'
            }
            const data =  params.ideCategory > 0 ? await HttpCategory.updateHttpCategory(params): await HttpCategory.saveHttpCategories(params) ;
            if(data){
                this.setState({ loading: false });
                if(data.errorMessage){
                    alert(data.errorMessage);
                }else{
                    //const msj = 'Category successfully';
                    //params.ideCategory > 0 ? alert(msj+ ' updated'): alert(msj+' created');
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
                    <ImageBackgroundComponent image = { this.state.imageBackground } />
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