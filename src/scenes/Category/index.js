import React, {Component} from 'react'
import {
    FlatList,
    Alert,
    StyleSheet,
} from 'react-native';
import { Text, Container, Content, List, ListItem, Icon, Left , Right} from 'native-base';

import HttpCategory from "./../../services/category/http-category";
import ItemCategory from './components/item-category';
import CustomHeader from '../../container/header';

class Category extends Component{

    constructor(props){
        super(props);
        this.state = {
            categoriesList: [],
            arrayholder: []
        }
        this.getDataCategories();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <CustomHeader
                    title = "Category List"
                    nameIcon = "ios-home"
                    isHome = {true}
                />
            )
        }
    }

    componentDidMount = () => { 
        this.getDataCategories();
    }

    /**
     * Metodo para Obtener las Categorias de nuestra Api
     */
    async getDataCategories(){
        const data = await HttpCategory.getHttpCategories();
        this.setState({
            categoriesList: data,
            arrayholder: data,
        });
    }
    handleClick(item){
        Alert.alert("I am clicked " + item.name);
    }
    renderItem = ( { item }) => <ItemCategory navigation = { this.props.navigation } category = { item } />
    separatorComponent = () => <ItemSeparator />;
    emptyComponent = () => <Text> Categories not found </Text>
    keyExtractor = item => item.idCategory.toString();
    render(){
        return (
            <Container>
                <Content>
                <List 
                    dataArray = { this.state.categoriesList }
                    renderRow = { item =>{
                        return(
                            <ListItem>
                                <Left>
                                    <ItemCategory navigation = { this.props.navigation } category = { item } />
                                </Left>
                                <Right>
                                    <Icon name = "arrow-forward" />
                                </Right>
                            </ListItem>
                        );
                    }}
                />
                </Content>
            </Container>
        )
    }
}
export default Category;