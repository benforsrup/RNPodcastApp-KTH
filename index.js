import { Navigation } from 'react-native-navigation'
import React, { Component } from 'react';
import LoadingScreen from './src/screens/LoadingScreen'
import TrackPlayer from 'react-native-track-player'


TrackPlayer.registerEventHandler(async (data) => {
    console.log(data)
    if (data.type === 'playback-track-changed') {
      if (data.nextTrack) {
        const track = await TrackPlayer.getTrack(data.nextTrack);
        TrackStore.title = track.title;
        TrackStore.artist = track.artist;
        TrackStore.artwork = track.artwork;
      }
    } else if(data.type == 'remote-play') {
      TrackPlayer.play()
    } else if(data.type == 'remote-pause') {
      TrackPlayer.pause()
    } else if(data.type == 'remote-next') {
      TrackPlayer.skipToNext()
    } else if(data.type == 'remote-previous') {
      TrackPlayer.skipToPrevious()
    } else if (data.type === 'playback-state') {
      PlayerStore.playbackState = data.state;
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

