import React, { Component } from "react";
import {
    Alert,
    StyleSheet
} from "react-native";
import {Icon, Button,  Label, Container, Content, Form, Item, Input, Text, Picker} from 'native-base';

import HttpCategory from "./../../../services/category/http-category";
import CustomHeader from "../../../container/header";
import Loading from "../../../container/components/loading";
import HttpProduct from "../../../services/product/http-product";
import FieldRequired from "../../../container/components/field-required";
import ImageBackgroundComponent from "../../../container/components/image-background";

class ProductForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            ideProduct: 0,
            name: "",
            description: "",
            cost: "",
            price: "",
            image: "",
            errorMessage: null,
            isAddNew: true,
            titleButton: 'Create Product',
            product: null,
            loading: false,
            selected2: undefined, 
            dataCategories: null,
            pickerList: null,
        };
    }   

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-arrow-back"
                    title = {  'Product' }
                    navigation = { navigation }
                    //hasBackButtom= { props.navigation.state.routes.length > 1 }
                    hasBackButtom= { false }
                />
            )
        }
    }
    
    componentDidMount = () =>{ 

        //Get Categories
        this.getDataCategories();

        product = this.props.navigation.getParam('product', 'no-data');
        if( product.ideProduct > 0 ){
            this.setState({ 
                titleButton: 'Edit Product',
                isAddNew: false,
                ideProduct: product.ideProduct,
                name: product.name,
                description: product.description,
                cost: product.cost,
                price: product.price,
                image: product.image,
                address: product.address,
                city: product.city,
                selected2: product.category.ideCategory.toString(),
                loading: false 
            });
        }
    }

    async getDataCategories(){
        const data = await HttpCategory.getHttpCategories();
        let items = [];
        if(data){
            { data.map((row) => {
                items.push(<Picker.Item label={ row.name } key ={ row.ideCategory.toString() } value={ row.ideCategory.toString() }/>);
            })}
            this.setState({ dataCategories: data, pickerList: items })
        }
    }

    async refreshList (data) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onResult(data);
    }

    validateForm(){
        //IdeCategory
        if ( this.state.selected2 == undefined ) {
            Alert.alert("Category field is requited")
            return false;
        }
        //Name
        if (this.state.name.trim() == "") {
            Alert.alert("Please enter product name")
            return false;
        }
        if (this.state.name.length > 60) {
            Alert.alert("The name field must have less than 60 characters")
            return false;
        }
        if (this.state.name !="" && this.state.name.length > 60) {
            Alert.alert("The description field must have less than 60 characters")
            return false;
        }

        //description
        if (this.state.description.trim() == "") {
            Alert.alert("Please enter product last name")
            return false;
        }
        if (this.state.description.length > 90) {
            Alert.alert("The last name field must have less than 90 characters")
            return false;
        }
        if (this.state.description !="" && this.state.name.length > 90) {
            Alert.alert("The last name field must have less than 90 characters")
            return false;
        }
        
        //cost
        if (this.state.cost.trim() == "") {
            Alert.alert("Please enter cost")
            return false;
        }
        if(isNaN(this.state.cost)){
            Alert.alert("The cost field, value is not number");
            return false;
        }

        //price
        if (this.state.price.trim() =="") {
            Alert.alert("Please enter price")
            return false;
        }
        if(isNaN(this.state.price)){
            Alert.alert("The price field, value is not number");
            return false;
        }
        if( this.state.cost.trim() > this.state.price.trim() ){
            Alert.alert("The cost field, not can´t be greater than the price");
            return false;
        }

        return true;
    }

    saveData = async () =>{
        try {
            this.setState({ loading: true });
            const params = {
                ideProduct: this.state.ideProduct,
                name: this.state.name,
                description: this.state.description,
                cost: this.state.cost,
                price: this.state.price,
                enable: 'S',
                ideCategory: this.state.selected2
            }
            const data =  params.ideProduct > 0 ? await HttpProduct.updateHttpProduct(params): await HttpProduct.saveHttpProduct(params) ;
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
                    <ImageBackgroundComponent item = { this.state.ideProduct } />
                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            placeholder="Select Category"
                            placeholderStyle={styles.text}
                            selectedValue={ this.state.selected2 }
                            onValueChange={ this.onValueChange2.bind(this) }  >
                            {this.state.pickerList}
                        </Picker>
                    </Item>
                    <Item floatingLabel>
                        <Label style={styles.text} >Product name <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={60}
                            onChangeText={ (name) => { this.setState({ name })  } }
                            value= {this.state.name} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Product description <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={200}
                            multiline = {true}
                            onChangeText={ (description) => { this.setState({ description })  } }
                            value= {this.state.description} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Product cost <FieldRequired/> </Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={30}
                            keyboardType = 'numeric'
                            onChangeText={ (cost) => { this.setState({ cost })  } }
                            value= {this.state.cost} />
                    </Item>
                    <Item floatingLabel last>
                        <Label style={styles.text}>Product price</Label>
                        <Input
                            style={styles.text}
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={30}
                            keyboardType = 'numeric'
                            onChangeText={ (price) => { this.setState({ price })  } }
                            value= {this.state.price} />
                    </Item>
                    <Label style={styles.text}></Label>
                    <Button full
                        onPress={() => {
                            if(this.validateForm()){
                                this.saveData();
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
    }
});
export default ProductForm;