import { Navigation } from 'react-native-navigation'
import React, { Component } from 'react';
import LoadingScreen from './src/screens/LoadingScreen'
import TrackPlayer from 'react-native-track-player'

import firebase from 'react-native-firebase';




TrackPlayer.registerEventHandler(async (data) => {    
    if(data.type == 'remote-play') {
      TrackPlayer.play()
    } else if(data.type == 'remote-pause') {
      TrackPlayer.pause()
    } else if(data.type == 'remote-next') {
      TrackPlayer.skipToNext()
    } else if(data.type == 'remote-seek') {
      console.log(data.type)
    }
  });



Navigation.registerComponent('LoadingScreen', () => LoadingScreen)
class App extends Component{
    constructor(props){
        super(props)   
        console.disableYellowBox = true; 
        this.startApp()
    }

    startApp(){
        
        Navigation.events().registerAppLaunchedListener(() => { 
            // Navigation.setDefaultOptions({
            //     topBar: {
            //       visible: false
            //     }
            //   });
            Navigation.setRoot({
                root: {
                    component:{
                        name: "LoadingScreen"
                    }
                }
            })
            
        })
        
    }
}

const app = new App()

