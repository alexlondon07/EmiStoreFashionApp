import React, {Component} from 'react'
import { ListView , Alert, StyleSheet } from 'react-native';
import { Text, Container, Button, Fab, View, Content, List, ListItem, Icon, Left , Right} from 'native-base';
import CustomHeader from '../../container/header';
import Loading from '../../container/components/loading';
import HttpClient from '../../services/client/http-client';
import AddButton from '../../container/components/add-button';

class Client extends Component{

    constructor(props){
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            clientsList: [],
            loading: true,
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            header: props => (
                <CustomHeader
                    nameIcon = "ios-menu"
                    title = { 'Client list' }
                    navigation = { navigation }
                    hasBackButtom= { true }
                    //hasBackButtom= { props.navigation.state.routes.length > 1 }
                />
            )
        }
    }

    componentDidMount = () =>{ 
        this.getDataClients()
    }

    onPress(){
        this.props.navigation.navigate('ClientFormScreen',  { onResult: this.onResult } ) 
    }

    deleteRow(item, secId, rowId, rowMap) {
        Alert.alert(
            'Delete Item',
            'You are sure to remove *' + item.name + '*',
                [
                    {text: 'No', onPress: () => rowMap[`${secId}${rowId}`].props.closeRow() },
                    {text: 'Yes', onPress: () => this.deleteClient(item, secId, rowId, rowMap) },
                ]
            );
    }

    onResult = data => {
        this.getDataClients();
        //this.setState({ clientsList: [...this.state.clientsList, data ]})
    }

    infoItem(item){
        Alert.alert('Info Item','Ide Client Nº ' + item.ideClient);
    }

    async deleteClient(item, secId, rowId, rowMap){
        this.setState({ loading: true });
        try {
            const data = await HttpClient.deleteHttpClient(item.ideClient);
            if(data){
                this.setState({ loading: false });
                if(data.status == 200){          
                    //Removemos de la Lista el Item Eliminado
                    rowMap[`${secId}${rowId}`].props.closeRow();
                    const newData = [...this.state.clientsList];
                    newData.splice(rowId, 1);
                    this.setState({ clientsList: newData });
                }else{
                    alert('Cannot delete item');
                }
            }
        } catch (error) {
            console.log(error);
            alert('An error has occurred, try it later');
        }
    }

    async getDataClients(){
        const data = await HttpClient.getHttpClients();
        if(data){
            this.setState({ clientsList: data, loading: false })
        }
    }

    emptyComponent = () => <Text> Clients not found </Text>
    keyExtractor = item => item.ideClient.toString();
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
                    dataSource={this.ds.cloneWithRows(this.state.clientsList)}
                    dataArray ={ this.state.clientsList }
                    renderRow = { item => {
                        return(
                            <ListItem  onPress = { ()=> this.props.navigation.navigate('ClientFormScreen',  { onResult: this.onResult, client: item } ) }>
                                <View style={styles.container}>
                                    <Text style={ styles.name }>{ item.name } { item.lastName }</Text>
                                    <Text style={ styles.cellphone }>{ item.cellphone }</Text>
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
        color: '#6b6b6b',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: "IndieFlower"
    },
    cellphone:{
        color: '#6b6b6b',
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    text: {
        fontFamily: "IndieFlower"
    }
});
export default Client;
