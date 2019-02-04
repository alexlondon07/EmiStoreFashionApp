import React, { Component } from 'react';
import { View, Text } from 'react-native';

class PickerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Item picker>
        <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            placeholder="Select Category"
            placeholderStyle={styles.text}
            selectedValue={this.state.selected2}
            onValueChange={this.onValueChange2.bind(this)}>
            <Picker.Item label="Wallet" value="key0" />
            <Picker.Item label="ATM Card" value="key1" />
            <Picker.Item label="Debit Card" value="key2" />
            <Picker.Item label="Credit Card" value="key3" />
            <Picker.Item label="Net Banking" value="key4" />
        </Picker>
        </Item>
    );
  }
}

export default PickerList;
