import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { Spinner, TextInput, NavigationBar, Title } from '@shoutem/ui'
import { SocialIcon } from 'react-native-elements'

import { initHome } from '../navigation/navigation'


class AuthScreen extends Component {
    componentDidMount(){
        //setTimeout(() => initHome(), 1000)
    }

    onPressGoogle = () => {
        initHome()
    }

    render() {
    return (
        <View style={styles.container}>    
        
          <View style={styles.input}>
            <SocialIcon 
              title='Sign in with Google'
              button
              onPress={this.onPressGoogle}
              type="google-plus-official"
            />
            <SocialIcon
              iconSize={20}
              title='Sign In With Facebook'
              button
              type='facebook'
            />
          </View>
        </View>
    );
    }
}

  
  
export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center'
  },
  input:{
    width:'80%'
  }
});