import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, 
    Dimensions
} from "react-native";

import Comments from '../components/Comments/Comments'
import PodCastPlayer from '../components/Player/PodCastPlayer'
import * as actions from "../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import TrackPlayer from 'react-native-track-player'
const SCREEN_HEIGHT = Dimensions.get('window').height

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

    componentDidMount(){
        this.props.actions.requestCommentByPodcast(this.props.podcast.id)
        
        TrackPlayer.setupPlayer().then(async () => {
            TrackPlayer.add(this.track).then(() => {
            });
        });
    
        TrackPlayer.updateOptions({
            capabilities: [TrackPlayer.CAPABILITY_PLAY,TrackPlayer.CAPABILITY_PAUSE]
        });
        

    
    }

 


    render() {
        return ( 
                <View  >
                    <PodCastPlayer 
                    onTogglePlayback={() => this.togglePlayback()}
                    podcast={this.props.podcast} />
                    <Comments podcast={this.props.podcast} styling={{marginTop:25, height: SCREEN_HEIGHT - 126, marginBottom:30}} />
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