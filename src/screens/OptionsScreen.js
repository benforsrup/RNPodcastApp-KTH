import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import firebase, { Firebase } from 'react-native-firebase'
import { ListItem, Avatar } from "react-native-elements";
import { Divider } from '@shoutem/ui'
import { initAuth, initHome } from '../navigation/navigation'


class OptionsScreen extends Component {
  

    logOut = () => {
      console.log("logging out")
      firebase.auth().signOut().then(() =>{
          initAuth()
      })

    }

    render() {
      console.log(firebase.auth().currentUser._user)
    return (
        <View style={styles.container}>

          <View style={{flexDirection:'row', alignItems:'center', marginBottom: 30, marginLeft:20}}>
          <Avatar
            size="medium"
            source={{uri: firebase.auth().currentUser._user.providerData[0].photoURL}}
            activeOpacity={0.7}
          />
          <Text style={{fontWeight:'bold'}}> {firebase.auth().currentUser._user.displayName}</Text>
          </View>
          <Divider styleName="line" />

          <View style={{flexDirection:'column',  marginLeft:20, marginTop: 20}}>
              <TouchableOpacity> 
                <View style={styles.buttonStyle}>
                <Text> Settings </Text> 
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.logOut}> 
                <View style={styles.buttonStyle}>
                <Text> Log out </Text> 
                </View>
              </TouchableOpacity>
          </View>
        </View>
    );
    }
}

  
  
export default OptionsScreen;

const styles = StyleSheet.create({
  container: {
    
    marginTop:40,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  buttonStyle:{
    paddingTop: 10,
    paddingBottom: 10
  }
});