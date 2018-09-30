import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

import { Screen } from '@shoutem/ui'
class SettingsScreen extends Component {
    constructor(props){
      super(props)
    }
    render() {

    return (
      <Screen>     
        <Text>dsadas</Text> 
      </Screen>
    );
    }
}

  
  
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});