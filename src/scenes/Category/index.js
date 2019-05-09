import React, {Component} from 'react';
import { ListView , Alert, StyleSheet } from 'react-native';
import { Text, Container, Button, Fab, View, Content, List, ListItem, Icon, Left , Right} from 'native-base';
import HttpCategory from "./../../services/category/http-category";
import CustomHeader from '../../container/header';
import Loading from '../../container/components/loading';
import AddButton from '../../container/components/add-button';
import axios from 'axios';
import { BASE_API, HTTP_CATEGORY } from '../../services/config';

class Category extends Component{

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            categoriesList: [],
            loading: true 
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-menu"
                    title = { 'Category list' }
                    navigation = { navigation }
                    hasBackButtom= { true }
                    //hasBackButtom= { props.navigation.state.routes.length > 1 }
                />
            )
        }
    }

    componentDidMount = () =>{ 
        this.getDataCategories()
    }

    onPress(){
        this.props.navigation.navigate('CategoryFormScreen',  { onResult: this.onResult } ) ;
    }

    deleteRow(item, secId, rowId, rowMap) {
        Alert.alert(
            'Delete Item',
            'You are sure to remove *' + item.name + '*',
                [
                    {text: 'No', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow() },
                    {text: 'Yes', onPress: () => this.deleteCategory(item, secId, rowId, rowMap) },
                ]
            );
    }

    onResult = data => {
        this.getDataCategories();
        //this.setState({ categoriesList: [...this.state.categoriesList, data ]})
    }

    infoItem(item){
        Alert.alert('Info Item','Ide Category Nº ' + item.ideCategory);
    }

    async deleteCategory(item, secId, rowId, rowMap){
        this.setState({ loading: true });
        try {
            const data = await HttpCategory.deleteCategory(item.ideCategory);
            if(data){
                this.setState({ loading: false });
                if(data.status == 200){          
                    //Removemos de la Lista el Item Eliminado
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
     * Method to get all categories from DataBase
     */
    async getDataCategories(){
        axios.get(`${ BASE_API }${ HTTP_CATEGORY.getCategories }`)
        .then(response => {
            this.setState({ categoriesList: response.data, loading: false })
        })
        .catch(error => {
            console.log(error);
        });
    }

    emptyComponent = () => <Text> Categories not found </Text>
    keyExtractor = item => item.ideCategory.toString();
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
                    dataSource={this.ds.cloneWithRows(this.state.categoriesList)}
                    dataArray ={ this.state.categoriesList }
                    renderRow = { item => {
                        return(
                            <ListItem  onPress = { ()=> this.props.navigation.navigate('CategoryFormScreen',  { onResult: this.onResult, category: item } ) }>
                                <View style={styles.container}>
                                    <Text style={ styles.name }>{ item.name }</Text>
                                    <Text style={ styles.description }>{ item.description }</Text>
                                </View>
                                <Right>
                                    <Icon name = "arrow-forward" />
                                </Right>
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
        color: '#5067FF',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: "IndieFlower"
    },
    description:{
        color: '#6b6b6b',
        fontSize: 14,
        marginLeft: 10,
        fontFamily: "IndieFlower"
    },
    text: {
        fontFamily: "IndieFlower"
    }
});
export default Category;
