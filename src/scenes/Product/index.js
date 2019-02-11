import React, {Component} from 'react'
import { ListView , Alert, StyleSheet } from 'react-native';
import { Text, Container, Thumbnail, Body, Button, Fab, View, Content, List, ListItem, Icon, Left , Right} from 'native-base';

import CustomHeader from '../../container/header';
import Loading from '../../container/components/loading';
import HttpProduct from '../../services/product/http-product';
import AddButton from '../../container/components/add-button';


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
        this.setState({ loading: true });
        try {
            const data = await HttpProduct.deleteHttpProduct(item.ideProduct);
            if(data){
                this.setState({ loading: false });
                if(data.status == 200){          
                    //Removemos de la Lista el Item Eliminado
                    rowMap[`${secId}${rowId}`].props.closeRow();
                    const newData = [...this.state.productsList];
                    newData.splice(rowId, 1);
                    this.setState({ productsList: newData });
                }else{
                    alert('Cannot delete item');
                }
            }
        } catch (error) {
            console.log(error);
            alert('An error has occurred, try it later');
        }
    }

    async getDataProducts(){
        const data = await HttpProduct.getHttpProducts();
        if(data){
            this.setState({ productsList: data, loading: false })
        }
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
                                    <Thumbnail quare large source={  item.image == null ? require('../../../assets/products/empty.png') : { uri: HttpProduct.getUrlImage(item.ideProduct) } } />
                                </Left>
                                <Body>
                                    <Text style={ styles.name }>{ item.ideProduct } { item.name }</Text>
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
