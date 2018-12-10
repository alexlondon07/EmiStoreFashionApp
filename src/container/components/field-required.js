import React from 'react';
import {
    Text,StyleSheet
} from "react-native";

const FieldRequired = props => (
    <Text style={styles.textRequired}>*</Text>
);

const styles = StyleSheet.create({
    textRequired: {
        color: 'red'
    }
});
export default FieldRequired;
