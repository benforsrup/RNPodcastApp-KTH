import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image
} from "react-native";
import { Spinner } from '@shoutem/ui'
import { initAuth, initHome } from '../navigation/navigation'
import firebase from 'react-native-firebase'


class LoadingScreen extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
    };
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        setTimeout(() => initHome(), 100) 
        this.setState({ loading: false, authenticated: true });
      } else {
        initAuth()
        this.setState({ loading: false, authenticated: false });
      }
    });
      
  }




    render() {
    return (
        <View style={styles.container}>    
        <Image source={require('../assets/logo.png')} style={{width: 250, height: 60}} />
          {/* <Spinner /> */}
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