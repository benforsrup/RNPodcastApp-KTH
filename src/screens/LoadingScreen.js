import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";


import { initHome, goHome } from '../navigation/navigation'


class LoadingScreen extends Component {
    componentDidMount(){
        setTimeout(() => initHome(), 1000)
    }

    render() {
    return (
        <View style={styles.container}>      
           <Text> Loading</Text>
        </View>
    );
    }
}

  
  
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});