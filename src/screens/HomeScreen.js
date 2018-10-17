import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, 
    Dimensions,
    SafeAreaView,
    StatusBar,
} from "react-native";

import Comments from '../components/Comments/Comments'
import PodCastPlayer from '../components/Player/PodCastPlayer'
import * as actions from "../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import TrackPlayer from 'react-native-track-player'
const SCREEN_HEIGHT = Dimensions.get('window').height
import {Navigation} from 'react-native-navigation'


class HomeScreen extends Component {
    constructor(props){
        super(props)

        this.track ={
            id:(this.props.podcast.id).toString(),
            url: this.props.podcast.mp3,
            title: this.props.podcast.name,
            artist: this.props.podcast.name
        }
    }

    async componentDidMount(){
        Navigation.mergeOptions(this.props.componentId,{
            statusBar:{
                visible:false
            }
        })
        this.props.actions.requestCommentByPodcast(this.props.podcast.id)
        
        const state = await TrackPlayer.getState()
        const currentTrack = await TrackPlayer.getCurrentTrack()
        console.log(currentTrack, this.props.podcast.id, state)
        if(state == 'playing' && currentTrack != this.props.podcast.id && currentTrack != undefined)
        {
            console.log("should reset")
            //TrackPlayer.reset()
        }
        // if( currentTrack && (currentTrack != this.props.podcast.id)){
        //     TrackPlayer.reset()
        // }
        // TrackPlayer.setupPlayer().then(async () => {
        //     TrackPlayer.add(this.track).then(() => {
        //     });
        // });
    
        // TrackPlayer.updateOptions({
        //     capabilities: [TrackPlayer.CAPABILITY_PLAY,TrackPlayer.CAPABILITY_PAUSE]
        // });
        

    
    }

 


    render() {
        return (
                <View >
                    <StatusBar hidden />
                    <PodCastPlayer 
                    onTogglePlayback={() => this.togglePlayback()}
                    podcast={this.props.podcast} />
                    <Comments podcast={this.props.podcast} styling={{marginTop:0, height: SCREEN_HEIGHT - 110}} />
                </View>
        );
    }
}
  

const mapStateToProps = state => ({ 
    commentList: state.comments,
    player: state.player 
  });
  
  const mapDispatchToProps = dispatch =>({
      actions: bindActionCreators( actions , dispatch)
  })
  
  
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
       backgroundColor:'gray'
    }
});