import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Alert
} from "react-native";
import {Icon, Button, Label, Container, Content, Form, Item, Input, Text} from 'native-base';
import HttpCategory from "../../services/category/http-category";

class CategoryDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            errorMessage: null,
            isAddNew: true,
        };
    }   
        
    goBackPreviewScreen (data) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onResult(data)
    }
    
    saveDataCategory = async () =>{
        try {
            const params = {
                name: this.state.name,
                description: this.state.description,
                enable: 'S'
            }
            const data = await HttpCategory.saveHttpCategories(params);
            if(data){
                if(data.errorMessage){
                    alert(data.errorMessage);
                }else{
                    alert('Category successfully created');
                    this.goBackPreviewScreen(data);
                }
            }else{
                alert('An error has occurred, try it later');
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
        <Container>
            <Content>
                <Form>
                    <Item stackedLabel>
                        <Label>Name</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={60}
                            placeholder="Enter Category name" 
                            onChangeText={ (name) => { this.setState({ name })  } }
                            value= {this.state.name} />
                    </Item>

                    <Item stackedLabel last>
                        <Label>Description</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            maxLength={60}
                            placeholder="Enter Description name" 
                            onChangeText={ (description) => { this.setState({ description })  } }
                            value= {this.state.description} />
                    </Item>

                    <View style={styles.container_button}>
                        <Button large primary
                            onPress={() => {
                                if (this.state.name.trim() == "") {
                                    Alert.alert("Please enter category name")
                                    return;
                                }
                                this.saveDataCategory();
                            }}>
                        <Icon name='ios-checkmark-circle' />
                        <Text>Save</Text>
                        </Button>
                    </View>

                </Form>
            </Content>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
  container_button:{
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

export default CategoryDetail;