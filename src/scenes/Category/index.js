import React, {Component} from 'react'
import { ListView , Alert} from 'react-native';
import { Text, Container, Button, Fab, View, Content, List, ListItem, Icon, Left , Right} from 'native-base';

import HttpCategory from "./../../services/category/http-category";
import ItemCategory from './components/item-category';
import CustomHeader from '../../container/header';

class Category extends Component{

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            categoriesList: [],
            categoriesListAux: [],
            basic: true,
        }
    }
    
    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-menu"
                    title = { 'Category List' }
                    navigation = { navigation }
                    hasBackButtom= { true }
                    //hasBackButtom= { props.navigation.state.routes.length > 1 }
                    onResult={ this.onResult }
                />
            )
        }
    }

    componentDidMount = () => { 
        this.getDataCategories();
    }

    deleteRow(item, secId, rowId, rowMap) {
        Alert.alert(
            'Delete Item',
            'You are sure to remove *' + item.name + '*',
                [
                    {text: 'No', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow() },
                    {text: 'Yes', onPress: () => this.deleteCategory(item.idCategory, secId, rowId, rowMap) },
                ]
            );
    }

    onResult = data => {
        //Objeto retornado del servicio, Agregar Categoria
        const element = {};
        element.name = data.name;
        element.description = data.description; 
        element.enable = data.enable;
        element.idCategory = data.idCategory;
        this.getDataCategories();
    }

    async deleteCategory(id, secId, rowId, rowMap){
        try {
            const data = await HttpCategory.deleteCategory(id);
            if(data){
                if(data.status == 200){                    
                    //Eliminamos de la Lista el Item Eliminado
                    rowMap[`${secId}${rowId}`].props.closeRow();
                    const newData = [...this.state.categoriesList];
                    newData.splice(rowId, 1);
                    this.setState({ categoriesList: newData });

                }else{
                    alert('Cannot delete item');
                }
            }
        } catch (error) {
            console.log(error);
            alert('An error has occurred, try it later');
        }
    }

    /**
     * Metodo para Obtener las Categorias de nuestra Api
     */
    async getDataCategories(){
        const data = await HttpCategory.getHttpCategories();
        this.setState({
            categoriesList: data,
        });
        console.log(data);
    }
    separatorComponent = () => <ItemSeparator />;
    emptyComponent = () => <Text> Categories not found </Text>
    keyExtractor = item => item.idCategory.toString();
    render(){
        return (
            <Container>
                <Content>
                <List
                    leftOpenValue={75}
                    rightOpenValue={-75}
                    dataSource={this.ds.cloneWithRows(this.state.categoriesList)}
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
                    renderLeftHiddenRow={item =>
                        <Button full onPress={() => alert(item.idCategory)}>
                            <Icon active name="information-circle" />
                        </Button>}
                    renderRightHiddenRow={(item, secId, rowId, rowMap) =>
                        <Button full danger onPress={_ => this.deleteRow(item, secId, rowId, rowMap)}>
                            <Icon active name="trash" />
                        </Button>}
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