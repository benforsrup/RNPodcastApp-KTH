import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { Spinner, TextInput, NavigationBar, Title } from '@shoutem/ui'
import { SocialIcon } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { initHome } from '../navigation/navigation'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';


class AuthScreen extends Component {
  

    // Calling this function will open Google for login.
  googleLogin = async () => {
  try {
    // Add any configuration settings here:
    await GoogleSignin.configure();

    const data = await GoogleSignin.signIn();

    const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
    const currentUser = await firebase.auth().signInWithCredential(credential);

    //console.info(JSON.stringify(currentUser.user.toJSON()));
    this.onSuccessFullLogin()
  } catch (e) {
    console.error(e);
  }
}

    onSuccessFullLogin = () => {
        if(firebase.auth().currentUser){
          console.log(firebase.auth().currentUser)
          initHome()
        }
        else{
          console.log("failed login")
        }      
    }

    render() {
    return (
        <View style={styles.container}>    
        
          <View style={styles.input}>
          

           <SocialIcon
              iconSize={20}
              onPress={this.googleLogin}
              title='Sign In With Google'
              button
              type='google-plus-official' />
        
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