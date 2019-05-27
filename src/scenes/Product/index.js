import React, {Component} from 'react'
import { ListView , Alert, StyleSheet } from 'react-native';
import { Text, Container, Thumbnail, Body, Button, Fab, View, Content, List, ListItem, Icon, Left , Right, Item} from 'native-base';
import axios from 'axios'

import CustomHeader from '../../container/header';
import Loading from '../../container/components/loading';
import AddButton from '../../container/components/add-button';
import { BASE_API, HTTP_PRODUCT } from '../../services/config';

class Product extends Component{

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            productsList: [],
            loading: true,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-menu"
                    title = { 'Product list' }
                    navigation = { navigation }
                    hasBackButtom= { true }
                />
            )
        }
    }

    componentDidMount = () =>{ 
        this.getDataProducts()
    }

    onPress(){
        this.props.navigation.navigate('ProductFormScreen',  { onResult: this.onResult } ) 
    }

    deleteRow(item, secId, rowId, rowMap) {
        Alert.alert(
            'Delete Item',
            'You are sure to remove *' + item.name + '*',
                [
                    {text: 'No', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow() },
                    {text: 'Yes', onPress: () => this.deleteProduct(item, secId, rowId, rowMap) },
                ]
            );
    }

    onResult = data => {
        this.getDataProducts();
        //this.setState({ productsList: [...this.state.productsList, data ]})
    }

    infoItem(item){
        Alert.alert('Info Item','Ide Product Nº ' + item.ideProduct);
    }

    async deleteProduct(item, secId, rowId, rowMap){
        this.loadingActivityIndicator(true);

        axios({
            method: 'DELETE',
            url: `${ BASE_API }${ HTTP_PRODUCT.deleteProduct }${ item.ideCategory }`,
        }).then(response => {
            
            this.loadingActivityIndicator(false);
            if(response.status == 200){          
                //Removemos de la Lista el Item Eliminado
                rowMap[`${secId}${rowId}`].props.closeRow();
                const newData = [...this.state.productsList];
                newData.splice(rowId, 1);
                this.setState({ productsList: newData });
            }else{
                this.loadingActivityIndicator(false);
                alert('Cannot delete item');
            }
            
        }).catch(error => {
            this.loadingActivityIndicator(false);
            alert('Cannot delete item, An error has occurred, try it later');
        });
    }

    /**
     * Method to active or inactive the Activity Indicator
     * @param {*} enable 
     */
    loadingActivityIndicator(enable){
        this.setState({ loading: enable });
    }

    /**
     * Method to get all products from DataBase
     */
    async getDataProducts(){
        axios.get(`${ BASE_API }${ HTTP_PRODUCT.getProducts }`)
        .then( response =>{
            this.setState({ productsList: response.data, loading: false })
        })
        .catch(error => {
            console.log(error);
            this.setState({ loading: false })
            alert('Error to get all products list');
        });
    }

    emptyComponent = () => <Text> Products not found </Text>
    keyExtractor = item => item.ideProduct.toString();
    render(){
        return (
            <Container>
                <Content>
                    { this.state.loading && 
                        <Loading/>
                    }
                <List 
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    dataSource={this.ds.cloneWithRows(this.state.productsList)}
                    dataArray ={ this.state.productsList }
                    renderRow = { item => {
                        return(
                            <ListItem avatar
                                onPress = { ()=> this.props.navigation.navigate('ProductFormScreen',  { onResult: this.onResult, product: item } ) }>
                                <Left>
                                    <Thumbnail quare large source={  item.image == null ? require('../../../assets/products/empty.png') : { uri: `${ BASE_API }${ HTTP_PRODUCT.getImage }${ item.ideProduct }${ '/images' }` } } />
                                </Left>
                                <Body>
                                    <Text style={ styles.category }>{ item.ideProduct } { item.name }</Text>
                                    <Text note>{ item.description }</Text>
                                    <Text note style={ styles.category }>{ item.category.name !=null ? item.category.name: '' }</Text>
                                </Body>
                            </ListItem>
                        );
                    }}
                    renderLeftHiddenRow={item =>
                        <Button full onPress={() => this.infoItem(item)}>
                            <Icon active name="information-circle" />
                        </Button>}
                    renderRightHiddenRow={(item, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.deleteRow(item, secId, rowId, rowMap)}>
                            <Icon active name="trash" />
                        </Button>}
                />
                </Content>
                <View>
                <AddButton
                    onPress={()=>this.onPress()}
                />
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        borderColor: 'red',
    },
    name:{
        color: '#6b6b6b',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: "IndieFlower"
    },
    text: {
        fontFamily: "IndieFlower"
    },
    category:{
        color: '#5067FF',
        fontSize: 15,
        fontFamily: "IndieFlower",
        fontWeight: 'bold'
    }
});
export default Product;
