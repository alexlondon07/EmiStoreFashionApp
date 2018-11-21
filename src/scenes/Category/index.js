import React, {Component} from 'react'
import { ListView , Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Container, Button, Fab, View, Content, List, ListItem, Icon, Left , Right} from 'native-base';
import HttpCategory from "./../../services/category/http-category";
import CustomHeader from '../../container/header';

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
                    title = { 'Category List' }
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
    }

    infoItem(item){
        alert('Ide Category Nº ' + item.idCategory);
    }

    async deleteCategory(item, secId, rowId, rowMap){
        try {
            const data = await HttpCategory.deleteCategory(item.idCategory);
            if(data){
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

    async getDataCategories(){
        const data = await HttpCategory.getHttpCategories();
        if(data){
            this.setState({ categoriesList: data, loading: false })
        }
    }

    emptyComponent = () => <Text> Categories not found </Text>
    keyExtractor = item => item.idCategory.toString();
    render(){
        return (
            <Container>
                <Content>
                    { this.state.loading && 

                            <View>
                            <ActivityIndicator
                            size="large"
                            color="#0000ff"
                            />
                        </View>
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
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress = { ()=> this.props.navigation.navigate('CategoryFormScreen',  { onResult: this.onResult } ) } >
                    <Icon name="ios-add" />
                </Fab>
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
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10
    },
    description:{
        color: '#6b6b6b',
        fontSize: 12,
        marginLeft: 10
    }
});

export default Category;
