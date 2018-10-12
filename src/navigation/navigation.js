import { Navigation } from 'react-native-navigation'
import { registerScreens } from '../../screen';
import store from '../redux/store';
const Icon = require('react-native-vector-icons/Ionicons');

let settingsIcon;
let menuIcon;

function initIcons(){
    return new Promise(function(resolve, rejects){
        Promise.all([
            Icon.getImageSource('ios-settings', 30),
            Icon.getImageSource('ios-list', 30)
        ]).then((values) => {
            settingsIcon = values[0]
            menuIcon = values[1]
            resolve(true)
        }).catch((error)=>{
            console.log(error)
            rejects(error)
        }).done()
    })
}

export const initHome = ()=> {
    registerScreens(store)
    initIcons().then(() => {
        goHome()
    }).catch((error) => {
        console.log(error)
    })
}

export const initAuth = () => {
    registerScreens(store)
    goAuth()
}


export const goAuth = () => Navigation.setRoot({
    root:{
        component:{
            id:"AuthScreen",
            name:"AuthScreen",
                    
        }
        
    }
})

export const goHome = () => Navigation.setRoot({
    root: {
        sideMenu: {  
            left: {
                component: {
                    id:"OptionsScreen",
                    name: 'OptionsScreen',
                   
                    passProps: {
                        text: 'This is a left side menu screen'
                    }
                }
            },
            
            center: {
                stack:{
                    children:[{
                        component:{
                            name:"SettingsScreen",
                            id:"SettingsScreen",
                            options:{
                                sideMenu:{
                                    left:{
                                        enabled:false,
                                        visible:false
                                    }
                                },
                                
                            },
                        },
                        component:{
                            name:"CommentScreen",
                            id:"CommentScreen",
                            options:{
                                
                                sideMenu:{
                                    left:{
                                        enabled:false,
                                        visible:false
                                    }
                                }
                            },
                            
                        },
                        component:{
                            name:"HomeScreen",
                            id:"HomeScreen",
                            
                            options:{
                               
                                sideMenu:{
                                    left:{
                                        enabled:false,
                                        visible:false
                                    }
                                }
                            },
                            
                        },
                        
                        component: {
                            id:"PodcastListView",
                            name: 'PodcastListView',
                            options:{
                                
                                sideMenu:{
                                    left:{
                                        width:200,
                                        enabled:false,
                                        visible:false
                                    }
                                },
                                topBar:{
                                    noBorder: true,
                                    visible:false,
                                    background: {
                                        translucent: true,
                                        blur: true
                                    },
                                    title:{
                                        text:"Podcasts"
                                    },
                                    largeTitle: {
                                        visible: false,
                                        
                                     },
                                    leftButtons:{
                                        id:"menuButton",
                                        icon:menuIcon
                                    },
                                    rightButtons:{
                                        id:"settingsButton",
                                        icon:settingsIcon
                                    }
                                }
                            }
                        },
                    }]
                }
            }
      }
    }
    
});

