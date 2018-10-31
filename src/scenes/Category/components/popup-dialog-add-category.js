import React, { Component } from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import HttpCategory from "./../../../services/category/http-category";

class PopupDialogAddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            isAddNew: true,
            dialogTitle: "",
            errorMessage: null
        };
    }

    /**
     * Show Dialog when add new Category
     */
    showDialogComponentForAdd = () => {
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle: "Add a new Category",
            name: "",
            description: "",
            isAddNew: true,
            categoryData: [],
            errorMessage: null
        });
    };

    goBackPreviewScreen (data) {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.onResult(data)
    }

    /*
    * Metodo para guardar una Categoria
    */
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
                    //this.refs.popupDialog.show();
                    alert(data.errorMessage);
                    console.log("hola 1");
                }else{
                    console.log("hola 2");
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
        const { dialogTitle } = this.state;
        return (
            <View>
                <FormLabel>Name</FormLabel>
                <FormInput                     
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Enter Category name" 
                    maxLength={30}
                    onChangeText={text => this.setState({ name: text })}/>
                    {this.state.errorMessage &&
                        <FormValidationMessage>
                            {this.state.errorMessage}
                        </FormValidationMessage>
                    }
                <FormLabel>Description</FormLabel>
                <FormInput  
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Enter category description" 
                    maxLength={100}
                    onChangeText={text => this.setState({ description: text })}/>

                    <View style={styles.container_button}>
                        <Button
                            backgroundColor="#2b6cc4"
                            icon={{name: 'save'}}
                            title='Save'
                            onPress={() => {
                                    if (this.state.name.trim() == "") {
                                        this.setState({
                                            errorMessage: "Please enter category name"
                                        })
                                        return;
                                    }
                                    if (this.state.isAddNew == true) {
                                        const category = {
                                            name: this.state.name,
                                            description: this.state.description
                                        };
                                        this.saveDataCategory();
                                    }
                                }}
                        />
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center"
    },
    container_button:{

        marginTop: 20
    },
    button: {
        backgroundColor: "#2b6cc4",
    },
    textButtonLabel: {
        color: "white",
        fontSize: 14,
    },
    formInput: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    }
});

export default PopupDialogAddCategory;
