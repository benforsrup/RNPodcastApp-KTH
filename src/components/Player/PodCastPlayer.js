import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image
} from "react-native";
import { Icon, Slider } from 'react-native-elements'
import moment from 'moment'
import Comment from '../Comments/Comment'
import * as actions from "../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import { Spinner } from '@shoutem/ui'
import TrackPlayer from 'react-native-track-player';
import CircularPlayer from './ProgressPlayer/CircularPlayer'
import BottomPlayer from './ProgressPlayer/BottomPlayer'

import firebase from 'react-native-firebase'


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

 function getFormattedTime(seconds){
  return moment("2015-01-01").startOf('day').seconds(seconds).format('H:mm:ss');
}
function geFormattedDuration(duration){
  return moment("2015-01-01").startOf('day').seconds(duration).format('H:mm:ss');
}


class PodCastPlayer extends Component {
  constructor(props){
    super(props)
    this.state = {
      hasLoaded: false,
      canScrollUp :false,
      angle: 0,
      timeSeconds:0,
      timePercentage:0,
      timeFormatted:"",
      isPlaying: false, 
      duration: 0
    }
  }

  

  componentWillMount() {
   
    this.setState({hasLoaded:true})

    this.scrollOffset = 0
    this.animation = new Animated.ValueXY({ x: 0, y:  30 })
  }

  _onPaus(){
    this.setState({isPlaying:false})
    clearInterval(this.timeInterval);
    //this.whoosh.pause()
    TrackPlayer.pause();

  }
  _onPlay(){
    this.setState({isPlaying:true})
    // this.whoosh.play()
    TrackPlayer.play();
    //this.timeInterval = setInterval(() => {this._updateTimeLine()}, 1000 )
    
  }

   skipForward = async () => {
    const currentTime = await TrackPlayer.getPosition()
    const duration = await TrackPlayer.getDuration()

    if(currentTime + 30 < duration){
      TrackPlayer.seekTo(currentTime + 30)
    }

  }


  skipBackward = async () => {
    const currentTime = await TrackPlayer.getPosition()
    if(currentTime - 30 > 0){
      TrackPlayer.seekTo(currentTime - 30)
    }
    else{
      TrackPlayer.seekTo(0)
    }

  }

  

  componentWillUnmount() {
    clearInterval(this.timeInterval);
  }

  onTouchPlayer(){
    if(this.state.canScrollUp){
      Animated.spring(this.animation.y, {
        toValue:30,
        tension:1
      }).start()
      this.setState({canScrollUp:false})
    }
    else{
      Animated.spring(this.animation.y, {
        toValue:SCREEN_HEIGHT-100,
        tension:1
      }).start()
      this.setState({canScrollUp:true})
    }
    
  }


 
  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }

    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 30],
      outputRange: [135, 37],
      extrapolate: "clamp"
    })
    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 30],
      outputRange: [0, 0, 1],
      extrapolate: "clamp"
    })
    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 30],
      outputRange: [0, 10],
      extrapolate: "clamp"
    })
    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 30],
      outputRange: [150, 90],
      extrapolate: "clamp"
    })
    animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT-220, SCREEN_HEIGHT - 30],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    })
    animatedBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 30],
      outputRange: ['white', 'gray'],
      extrapolate: "clamp"
    })
    animatedImageWidth = this.animation.y.interpolate({
      inputRange:[0, SCREEN_HEIGHT ],
      outputRange:[SCREEN_WIDTH+16, 20],
      extrapolate:"clamp"
    })
    animatedBottomTimelineHeight = this.animation.y.interpolate({
      inputRange:[0, SCREEN_HEIGHT],
      outputRange:[0, 50],
      extrapolate:"clamp"
    })

    animatedBorderRadius = this.animation.y.interpolate({
      inputRange:[0, SCREEN_HEIGHT],
      outputRange:[10, 0],
      extrapolate:"clamp"
    })
    animatedBlurRadius = this.animation.y.interpolate({
      inputRange:[0, SCREEN_HEIGHT-30],
      outputRange:[10, 0],
      extrapolate:"clamp"
    })


    const { podcast } = this.props
    return (
      
        <View>  
            <Animated.View style={{ flex: 1}}>  
                <Animated.View style={[animatedHeight, styles.modalStyle]}>
                  <BottomPlayer 
                      shouldSetTime={this.state.canScrollUp}
                      setCurrentTime={this.props.actions.setCurrentTime}
                       />

              <Animated.View style={{ height: animatedHeaderHeight-animatedBottomTimelineHeight, flexDirection: 'row', alignItems:'center' }}>    
                  <Animated.View style={{ height: animatedImageHeight, width: animatedImageWidth, marginLeft: animatedImageMarginLeft, borderTopLeftRadius:animatedBorderRadius,borderTopRightRadius:animatedBorderRadius, overflow:"hidden" }}>
                   
                    <Animated.Image blurRadius={animatedBlurRadius} style={{ flex: 1, width:null, height: null, opacity:1 }} source={podcast.image} />
                    
                    <Animated.View style={{position:'absolute', width:SCREEN_WIDTH, height:150, justifyContent:'center', alignItems:'center'}}>
                      <Text style={{fontSize:20, color:'white', fontWeight:'bold'}} > {this.props.podcast.name }</Text>
                    </Animated.View>

                    <Animated.View style={[{opacity:animatedSongDetailsOpacity},styles.minimizeButton]}>
                      <Icon onPress={() => this.onTouchPlayer()} name='chevron-down' size={70} type='evilicon' color='#255' />
                    </Animated.View> 

                  </Animated.View>
                  
                  <Animated.Text onPress={() => this.onTouchPlayer()} style={{ opacity: animatedSongTitleOpacity, fontSize: 18, paddingLeft: 10 }}>{this.props.podcast.name}</Animated.Text>
                  <Animated.View style={{ opacity: animatedSongTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                      {this.state.isPlaying ? 
                          <Icon containerStyle={styles.pauseBottomIconStyle} name="controller-paus" type="entypo" size={20} onPress={()=> this._onPaus()} /> : 
                          <Icon  containerStyle={styles.playBottomIconStyle} name="play" type="feather" size={20} onPress={()=> this._onPlay()} />}
                  </Animated.View>

              </Animated.View>

              <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongDetailsOpacity, flex: 1, alignItems:'center', justifyContent:'space-between'}}>
              { !this.state.hasLoaded && <Spinner />}
                <View>

                 
                </View>

                <View style={{paddingBottom: 30}}>

              <CircularPlayer 
                  podcast={this.props.podcast}
                  shouldSetTime={!this.state.canScrollUp} 
                  setCurrentTime={this.props.actions.setCurrentTime} />
                </View>

                <View style={{ width:SCREEN_WIDTH-150, height:60, flexDirection: 'row', justifyContent: 'space-between', marginBottom:10 }}>
                <Icon containerStyle={styles.circleRounded} name="replay-30" type="materialicons" size={30} onPress={() => this.skipBackward()} />
                  
                  {this.state.isPlaying ? 
                  <Icon  containerStyle={styles.pauseIconStyle} name="controller-paus" type="entypo" size={30} onPress={()=> this._onPaus()} /> :
                  <Icon containerStyle={styles.playIconStyle} name="play" type="feather" size={30} onPress={()=> this._onPlay()} />}
                  <Icon containerStyle={styles.circleRounded} name="forward-30" type="materialicons" size={30}  onPress={()=>this.skipForward()}/> 
                
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                </View>
              </Animated.View>

          </Animated.View>
            </Animated.View>
      
      </View>
    );
  }
}

const mapStateToProps = state => ({ 
  commentList: state.comments,
});

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators( actions , dispatch)
  
})


export default connect(mapStateToProps, mapDispatchToProps)(PodCastPlayer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalStyle:{
    position: 'absolute', 
    left: 0, 
    right: 0, 
    zIndex: 10, 
    backgroundColor: 'white', 
    height: SCREEN_HEIGHT,
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  circleRounded:{
   
  
  },
  playIconStyle:{
    backgroundColor:'#FCF7F8',
    borderRadius:100,
    width:60,
    paddingLeft:6,
    height:60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playBottomIconStyle:{
    backgroundColor:'#FCF7F8',
    borderRadius:100,
    width:40,
    paddingLeft:6,
    height:40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pauseIconStyle:{
    backgroundColor:'#FCF7F8',
    borderRadius:100,
    width:60,
    paddingTop:3,
    height:60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pauseBottomIconStyle:{
    backgroundColor:'#FCF7F8',
    borderRadius:100,
    width:40,
    paddingTop:3,
    paddingLeft:3,
    height:40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomTimeLineStyle:{
    width: SCREEN_WIDTH - 100, 
    alignItems: 'center', 
    flexDirection:'row',
    justifyContent:'center'
  },
  minimizeButton:{
    position:'absolute', 
    top:-10, 
    left: 0,
    right:0,
    width:null, 
    zIndex:9999
  }
});