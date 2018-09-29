import { Navigation } from 'react-native-navigation'
import React, { Component } from 'react';
import LoadingScreen from './src/screens/LoadingScreen'
Navigation.registerComponent('LoadingScreen', () => LoadingScreen)
class App extends Component{
    constructor(props){
        super(props)    
        this.startApp()
    }

    startApp(){
        Navigation.events().registerAppLaunchedListener(() => { 
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

