import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { Spinner } from '@shoutem/ui'

import { initAuth, initHome } from '../navigation/navigation'


class LoadingScreen extends Component {
    componentDidMount(){
        setTimeout(() => initAuth(), 0)
    }



    render() {
    return (
        <View style={styles.container}>      
          <Spinner />
        </View>
    );
    }
}

  
  
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  }
});