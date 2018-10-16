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
    ListView,
    Subtitle,
    Card,
    Screen,
    GridRow,
    Image,
 } from '@shoutem/ui'
import podcasts from '../services/podcasts'
import { NativeEventsReceiver } from "react-native-navigation/lib/dist/adapters/NativeEventsReceiver";

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
                    "id": "3m8Mh2c9ZYnSBBar0qDL",
                    "image": { "url": "/Users/benforsrup/Documents/Webdev/ReactNative/RNPodcastApp/src/assets/framgang.png" },
                    "mp3":"https://ads-e-bauerse-pods.sharp-stream.com/499/titti_schultz_original_0026b3ac_normal.mp3"
                },
                {
                    "name": "Bank & Frändén",
                    "id": "L8HQJg6hc2aMbQqBCiIc",
                    "image": { "url": "/Users/benforsrup/Documents/Webdev/ReactNative/RNPodcastApp/src/assets/bank.png" },
                    "mp3": "https://media.acast.com/bankochfranden/-1-hornyteenspornfootballpod/media.mp3"
                },
                {
                    "name": "P3 Dokumentär",
                    "id": "ZKoH8HcoYGCDWxXFwy30",
                    "image": { "url": "/Users/benforsrup/Documents/Webdev/ReactNative/RNPodcastApp/src/assets/p3.png" },
                    "mp3": "https://sverigesradio.se/topsy/ljudfil/itunes/6650863.mp3"
                },
                {
                    "name": "Mordpodden",
                    "id": "9882l8rBy1t8Yx4oWb7i",
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
        this.listOfPodcasts = podcasts

        // this.state.podcasts.forEach(element => {
        //     firebase.firestore().collection('podcasts').add(element)
        //     .then(newComment => {
        //         firebase.firestore().collection('podcasts').doc(newComment.id).update({
        //             id: newComment.id
        //         })
        //     })
            
        // });
  
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

    goToScreen = async (podcast) => {
        // if(screenName == "HomeScreen"){
               await Navigation.push(this.props.componentId, {
                    component: {
                        name: "PodcastChooseView",
                        passProps: {
                            "podcast": podcast
                        },
                        options:{
                            animations:{
                                push:{
                                    enable:true
                                }
                            },
                            topBar:{
                                visible:false,
                                drawBehind:true
                            }, 
                            statusBar:{
                                style:'dark'
                            }
                            
                            
                        }
                    }
                })
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
        const listOfPodcasts = podcasts
        const isIphoneX = this.device == 'iPhone10,6'
        const groupedData = GridRow.groupByRows(listOfPodcasts, 2);
        return (
            <Screen>     
                <NavigationBar
                  styleName="inline no-border"
                  style={{container:{
                         
                      height:isIphoneX ? 90 : 70
                  },
                  componentsContainer:{
                      paddingTop:isIphoneX ? 20 : 0
                  }
                }}
                leftComponent={<Icon onPress={this.toggleMenu} name="sidebar" />}
                
                centerComponent={<Image styleName="medium-wide" style={{width: 120, height:28}} source={require('../assets/logo.png')}/>}
                />
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