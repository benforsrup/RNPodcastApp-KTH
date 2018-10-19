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
    
    }
    

 


    render() {
        return (
                <SafeAreaView >
                    <StatusBar hidden />
                    <PodCastPlayer
                    onTogglePlayback={() => this.togglePlayback()}
                    podcast={this.props.podcast} />
                    <Comments podcast={this.props.podcast} styling={{height: SCREEN_HEIGHT - 160}} />
                </SafeAreaView>
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