import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";


class OptionsScreen extends Component {


    render() {
    return (
        <View style={styles.container}>      
           <Text> Settings</Text>
        </View>
    );
    }
}

  
  
export default OptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});