import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import * as actions from "../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'

class PodcastListView extends Component {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
        this.state = {
            menuOpened: false
        }
      }
    
      navigationButtonPressed({ buttonId }) {
          console.log(buttonId)
          if(buttonId=="menuButton") {
              this.toggleMenu()
          }
          else if(buttonId=="settingsButton"){
              this.goToScreen("SettingsScreen")
          }
      }

    componentDidMount(){

    }

    toggleMenu = () => {
        Navigation.mergeOptions("OptionsScreen", {
            sideMenu:{
                left:{
                    visible: true
                }
            }
        })  
    }

    goToScreen = (screenName) => {
        if(screenName == "HomeScreen"){
                Navigation.push(this.props.componentId, {
                    component: {
                        name: screenName,
                        options:{
                            topBar:{
                                visible:false
                            }
                        }
                    }
                })
            }
            else if(screenName=="SettingsScreen"){
                Navigation.push(this.props.componentId, {
                    component: {
                        name: screenName,
                        options:{
                            topBar:{
                                title:{
                                    text: "Settings"
                                }
                            }
                        }
                    }
                })
            }
        
    }

    render() {
        console.log(this.props)
    return (
        <View style={styles.container}>      
           <Button title="Press here to player" onPress={()=>this.goToScreen("HomeScreen")}/>
        </View>
    );
    }
}

const mapStateToProps = state => ({ 
    commentList: state.comments 
  });
  
  const mapDispatchToProps = dispatch =>({
      actions: bindActionCreators( actions , dispatch)
  })
  
  
export default connect(mapStateToProps, mapDispatchToProps)(PodcastListView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});