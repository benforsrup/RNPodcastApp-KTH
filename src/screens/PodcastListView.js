import React, { Component } from "react";
import {
  View,
  StyleSheet,
 
} from "react-native";
import * as actions from "../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import DeviceInfo from 'react-native-device-info';

import { 
    Icon,
    NavigationBar, 
    Title, 
    Button, 
    Text,
    ListView,
    ImageBackground,
    Subtitle,
    Card,
    Screen,
    GridRow,
    TouchableOpacity,
    Caption,
    Image,
    Divider,
    Tile,
    Touchable
 } from '@shoutem/ui'
import HomeScreen from "./HomeScreen";


import PodCastPlayer from '../components/Player/PodCastPlayer'
class PodcastListView extends Component {

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.device = DeviceInfo.getDeviceId()
        console.log(this.device)
        Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
        this.state = {
            menuOpened: false,
            podcasts:[
                {
                    "name": "Framgångspodden",
                    "id": 0,
                    "address": "185 Sutter St, San Francisco, CA 94109",
                    "image": { "url": "/Users/benforsrup/Documents/Webdev/ReactNative/RNPodcastApp/src/assets/framgang.png" },
                    "mp3":"https://ads-e-bauerse-pods.sharp-stream.com/499/titti_schultz_original_0026b3ac_normal.mp3"
                },
                {
                    "name": "Bank & Frändén",
                    "id": 1,
                    "address": "527 Broome St, New York, NY 10013",
                    "image": { "url": "/Users/benforsrup/Documents/Webdev/ReactNative/RNPodcastApp/src/assets/bank.png" },
                    "mp3": "https://media.acast.com/bankochfranden/-1-hornyteenspornfootballpod/media.mp3"
                },
                {
                    "name": "P3 Dokumentär",
                    "id": 2,
                    "address": "225 Mulberry St, New York, NY 10012",
                    "image": { "url": "/Users/benforsrup/Documents/Webdev/ReactNative/RNPodcastApp/src/assets/p3.png" },
                    "mp3": "https://sverigesradio.se/topsy/ljudfil/itunes/6650863.mp3"
                },
                {
                    "name": "Mordpodden",
                    "id": 3,
                    "address": "225 Mulberry St, New York, NY 10012",
                    "image": { "url": "/Users/benforsrup/Documents/Webdev/ReactNative/RNPodcastApp/src/assets/mordpodden.png" },
                    "mp3": "https://ads-e-bauerse-pods.sharp-stream.com/441/s07e03_dodsskjutningen_3f21a015_normal.mp3"
                }    
            ]
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
    previewCompleted({ previewComponentId }) {
       // console.log(previewComponentId)
    }

    goToScreenPreview = async (podcast, {reactTag}) => {
        console.log(reactTag, podcast, "hejsan")
        await Navigation.push(this.props.componentId, {
            component: {
              name: 'HomeScreen',
              passProps: {
                "podcast": podcast
            },
              options: {
                  popGesture:true,
                animations: {
                  push: {
                    enable: false
                  }
                },
                topBar:{
                    visible:true
                },
                preview: reactTag ? {
                  reactTag,
                  height: 500,
                  commit: true,
                } : undefined,
              }
            }
          });
    }

    goToScreen = async (podcast) => {

        console.log(this.props.componentId)
        // if(screenName == "HomeScreen"){
               await Navigation.push(this.props.componentId, {
                    component: {
                        name: "HomeScreen",
                        passProps: {
                            "podcast": podcast
                        },
                        options:{
                            topBar:{
                                visible:false,
                            }, 
                            
                        }
                    }
                })
                // Navigation.showModal({
                //     stack: {
                //         children: [{
                //             component: {
                //                 name: screenName,
                //                 passProps: {
                //                     "podcast": prop
                //                 }
                //             }
                //         }],
        
                //         options: {
                //             topBar:{
                //                 visible:false,
                //             }
                //         }
                //     }
                // });
            // }
            // else if(screenName=="SettingsScreen"){
            //     Navigation.push(this.props.componentId, {
            //         component: {
            //             name: screenName,
            //             options:{
            //                 topBar:{
            //                     title:{
            //                         text: "Settings"
            //                     }
            //                 }
            //             }
            //         }
            //     })
            // }
        
    }



    renderRow(rowData, sectionId, index) {
        // rowData contains grouped data for one row,
        // so we need to remap it into cells and pass to GridRow
      
        const cellViews = rowData.map((podcast, id) => {
          return (
            <Navigation.TouchablePreview 
                // onPressIn={({reactTag})=>this.goToScreenPreview(podcast,{reactTag})}
                onPress={() => this.goToScreen(podcast)} key={id} styleName="flexible">
              <Card>
                      <Image
                      style={{height:150}}
                      styleName="medium-wide"
                      source={{ uri: podcast.image.url  }}
                      />
                <View styleName="content" style={{paddingTop:10, paddingBottom:10}}>
                  <Subtitle numberOfLines={3}>{podcast.name}</Subtitle>
                </View>
              </Card>
            </Navigation.TouchablePreview>
          );
        });
      
        return (
          <GridRow columns={2}>
            {cellViews}
          </GridRow>
        );
      }



    render() {
        const podcasts = this.state.podcasts
        const isIphoneX = this.device == 'iPhone10,6'
        const groupedData = GridRow.groupByRows(podcasts, 2);
        return (
            <Screen>     
                {/* <NavigationBar
                  styleName="inline no-border"
                  style={{container:{
                      backgroundColor:'gray',   
                      height:isIphoneX ? 90 : 70
                  },
                  componentsContainer:{
                      paddingTop:isIphoneX ? 20 : 0
                  }
                }}
                leftComponent={<Icon onPress={this.toggleMenu} name="sidebar" />}
                rightComponent={(
                    <Button styleName="clear">
                    <Icon onPress={() => this.goToScreen("SettingsScreen")} name="settings"/>
                    </Button>)}
                centerComponent={<Title>TITLE</Title>}
                /> */}
                <ListView
                    data={groupedData}
                    renderRow={this.renderRow}
                />
            </Screen>
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
  },
  
});