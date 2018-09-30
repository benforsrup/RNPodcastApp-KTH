import { Navigation } from 'react-native-navigation'
import React, { Component } from 'react';
import LoadingScreen from './src/screens/LoadingScreen'
import TrackPlayer from 'react-native-track-player'
TrackPlayer.registerEventHandler(require('./player-handler.js'));
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

