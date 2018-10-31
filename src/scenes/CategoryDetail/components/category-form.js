import React, { Component } from 'react'
import { Label, Container, Content, Form, Item, Text, Input} from 'native-base';

class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            description: "",
            isAddNew: true,
            errorMessage: null
        };
    }

    render() {
        return (
        <Container>
            <Content>
                <Text>Hola</Text>
                <Form>
                    <Item>
                        <Label>Username</Label>
                        <Input 
                            onChangeText={ (text) => { this.setState({ name: text })  } }
                            value={this.state.name}/>
                    </Item>
                </Form>
            </Content>
        </Container>
        )
    }
}
export default CategoryForm;