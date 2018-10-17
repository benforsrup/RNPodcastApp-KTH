import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { ListItem, List, Flatlist, Icon } from "react-native-elements";
import { Screen, NavigationBar, Image, Title, ListView,ScrollView } from '@shoutem/ui'
import { Navigation } from 'react-native-navigation'
import TrackPlayer from 'react-native-track-player'
import firebase from 'react-native-firebase'
class PodcastChooseView extends Component {
    constructor(props){
        super(props)
        Navigation.events().bindComponent(this);

    }

    componentDidMount(){
        let ref = firebase.firestore().collection('podcasts').doc(this.props.podcast.id)
        // ref.update({
        //     episodes: episodes
        // })
        
        TrackPlayer.setupPlayer()
        TrackPlayer.updateOptions({
            capabilities: [TrackPlayer.CAPABILITY_PLAY,TrackPlayer.CAPABILITY_PAUSE]
        });  
        this.addTracks()      
    }

    async componentDidAppear() {
        const currentTrack = await TrackPlayer.getCurrentTrack()
        const { episodes } = this.props.podcast
        let exists = false
        for(let i in episodes){
            let episode = episodes[i]
            if (currentTrack == episode.id){
                console.log("already exists in track")
                exists = true
            }
            
        }
        if(!exists){
            this.addTracks()
        }
    }

 

    addTracks = () =>{
        const { episodes } = this.props.podcast
        this.tracks = []
        for(let i in episodes){
            let episode = episodes[i]
            let track = {
                id:episode.id,
                url: episode.mp3,
                title: episode.name,
                artist: this.props.podcast.name
            }     
            this.tracks.push(track)
        }
        TrackPlayer.add(this.tracks)
    }
   

    _gotoPodcast = async(podcast) => {
        podcast.image = this.props.podcast.image
        const state = await TrackPlayer.getState()
        const currentTrack = await TrackPlayer.getCurrentTrack()
        // if(state == 'playing' || state=='paused' && currentTrack != this.props.podcast.id && currentTrack != undefined){
            
        //     TrackPlayer.skip(podcast.id)
        //     TrackPlayer.stop()
        // }
        if(currentTrack != podcast.id){
            TrackPlayer.skip(podcast.id)
        }

       await Navigation.push(this.props.componentId, {
            component:{
                name:'HomeScreen',
                passProps:{
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
                    }    
                }
            }
        })
    }


    pushBack = () => {
        Navigation.pop(this.props.componentId)
    }

    renderPodcast= (podcast) =>{
        return(
            <TouchableOpacity onPress={() => this._gotoPodcast(podcast)}>
            <View style={{marginTop: 10,padding: 10, backgroundColor: "#B2DBBF", flexDirection:'row', 
             alignItems:'center', justifyContent:'space-between'}}>
                
                <Text style={{fontSize: 12}}>
                    {podcast.name}
                </Text>
                <Icon name='controller-play' type='entypo' />
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        const episodes = this.props.podcast.episodes
        return (
            <Screen>     
                <NavigationBar
                  styleName="inline no-border"
                leftComponent={<Icon onPress={this.pushBack} iconStyle={{marginLeft:10}} name='keyboard-backspace' type='materialicons' />}
                centerComponent={<Title>Podcasts</Title>}
                />

                    <View style={{flex: 1, alignItems:'center', marginTop:20}}>

                        <View style={styles.podcastImageStyle}>
                            <Image styleName="medium-square" source={this.props.podcast.image}/>
                        </View>
                        <View style={{marginTop:20}}>
                            <ListView 
                                data={episodes}
                                renderRow={this.renderPodcast}
                            />
                        </View>

                   </View>
            </Screen>
        );
    }
}

  
  
export default PodcastChooseView;

const styles = StyleSheet.create({
  container: {   
    marginTop:40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  podcastImageStyle:{
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  }
});