import React, { Component } from 'react';
import { Fab, Icon } from 'native-base';

class AddButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Fab
                active = { true }
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={ this.props.onPress } >
                <Icon name="ios-add" />
            </Fab>
        );
    }
}

export default AddButton;