import React, {Component} from 'react'
import {
    FlatList,
    Alert,
    StyleSheet,
} from 'react-native';
import { Text, Container, Button, Fab, View, Content, List, ListItem, Icon, Left , Right} from 'native-base';

import HttpCategory from "./../../services/category/http-category";
import ItemCategory from './components/item-category';
import CustomHeader from '../../container/header';

class Category extends Component{

    constructor(props){
        super(props);
        this.state = {
            categoriesList: [],
            arrayholder: [],
            categoriesListAux: []
        }
        this.getDataCategories();
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-home"
                    title = { 'Category List' }
                    navigation = { navigation }
                    hasBackButtom= { props.navigation.state.routes.length > 1 }
                    onResult={ this.onResult }
                />
            )
        }
    }

    componentDidMount = () => { 
        this.getDataCategories();
    }

    onResult = data => {
        //Objeto retornado del servicio, Agregar Categoria
        const element = {};
        element.name = data.name;
        element.description = data.description; 
        element.enable = data.enable;
        element.idCategory = data.idCategory;
        
        this.state.categoriesListAux = this.state.categoriesList;
        this.state.categoriesListAux.push(element)
        this.setState({
            categoriesList: this.state.categoriesListAux,
        });
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
                                    <ItemCategory navigation = { this.props.navigation } category = { item }  />
                                </Left>
                                <Right>
                                    <Icon name = "arrow-forward" />
                                </Right>
                            </ListItem>
                        );
                    }}
                />
                </Content>
                <View>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress = { ()=> this.props.navigation.navigate('CategoryDetailScreen',  { onResult: this.onResult } ) } >
                    <Icon name="ios-add" />
                </Fab>
                </View>
            </Container>
        )
    }
}
export default Category;