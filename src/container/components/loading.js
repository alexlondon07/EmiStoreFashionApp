import React, { Component } from 'react';
import { View,  ActivityIndicator,StyleSheet } from 'react-native';

class Loading extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                />
            </View>
            );
        }
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
})

export default Loading;
