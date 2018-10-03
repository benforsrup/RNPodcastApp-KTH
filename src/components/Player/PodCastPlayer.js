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

//import Svg, { G, Path } from 'react-native-svg';
import CircularSlider from '../Timeline/CircularSlider'
import Sound from 'react-native-sound';
import { Navigation } from "react-native-navigation";


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

  

  async componentWillMount() {
    console.disableYellowBox = true;
    let track ={
      id:(this.props.podcast.id).toString(),
      url: this.props.podcast.mp3,
      title: this.props.podcast.name,
      artist: this.props.podcast.name
    }
    TrackPlayer.setupPlayer().then(async () => {
      // Adds a track to the queue
        TrackPlayer.add(track).then(() => {
          this.setState({hasLoaded:true})
        });

      });

    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]

    });
    TrackPlayer.setVolume(0.1)
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

  _updateTimeLine(){
    TrackPlayer.getDuration().then((dur) => {
      if(dur > 0){
        this.setState({duration:dur})     
      }
    })
    TrackPlayer.getPosition().then((seconds)=> { 
      let formattedTime = moment("2015-01-01").startOf('day').seconds(seconds).format('H:mm:ss')
      let formattedDuration = moment("2015-01-01").startOf('day').seconds(this.state.duration).format('H:mm:ss');
      let angle = (360*(seconds+1))/this.state.duration
      let timePercentage = seconds*100/this.state.duration
      this.props.actions.setCurrentTime(seconds)
      this.setState({
        angle: angle,
        timeFormatted: formattedTime + " / " + formattedDuration,
        timeSeconds: Math.round(seconds), 
        timePercentage: timePercentage
      })
    })
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

  _updateTimeValue (value){
    console.log(value)
      let time  = (value*this.state.duration)/360  
      let timePercentage = (value*100)/360
     
      this.setState({angle: value, duration: Math.round(time), timePercentage: timePercentage})
      //TrackPlayer.seekTo(time);
  }
  _updateBottomTimeValue(value){
    console.log(value)
    let angle = (value/100)*360
    let time = (value/100)*this.state.duration
    this.setState({
      angle: angle,
      duration: Math.round(time),
      timePercentage: value
    })
    //TrackPlayer.seekTo(time)
  }
  _onTimeLineChange(value){
    console.log(value)

  }

 
  render() {
    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }

    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 40],
      outputRange: [155, 32],
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
      inputRange: [0, SCREEN_HEIGHT - 40],
      outputRange: [150, 90],
      extrapolate: "clamp"
    })
    animatedSongDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT-220, SCREEN_HEIGHT - 40],
      outputRange: [1, 0, 0],
      extrapolate: "clamp"
    })
    animatedBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 40],
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


    const { podcast } = this.props
    return (
        <View>  
            <Animated.View style={{ flex: 1}}>  
                <Animated.View style={[animatedHeight, styles.modalStyle]}>
                  <BottomPlayer 
                      shouldSetTime={this.state.canScrollUp}
                      setCurrentTime={this.props.actions.setCurrentTime}
                      onTimeLineChange={this._onTimeLineChange}
                       />

              <Animated.View style={{ height: animatedHeaderHeight-animatedBottomTimelineHeight, flexDirection: 'row', alignItems:'center' }}>    
                  <Animated.View style={{ height: animatedImageHeight, width: animatedImageWidth, marginLeft: animatedImageMarginLeft, borderTopLeftRadius:animatedBorderRadius,borderTopRightRadius:animatedBorderRadius, overflow:"hidden" }}>
                    <Image style={{ flex: 1, width:null, height: null, opacity:1 }} source={podcast.image} />
                    
                    <Animated.View style={[{opacity:animatedSongDetailsOpacity},styles.minimizeButton]}>
                      <Icon onPress={() => this.onTouchPlayer()} name='chevron-down' size={70} type='evilicon' color='#255' />
                    </Animated.View> 

                  </Animated.View>
                  
                  <Animated.Text onPress={() => this.onTouchPlayer()} style={{ opacity: animatedSongTitleOpacity, fontSize: 18, paddingLeft: 10 }}>{this.props.podcast.name}</Animated.Text>
                  <Animated.View style={{ opacity: animatedSongTitleOpacity, flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                      {this.state.isPlaying ? 
                          <Icon name="controller-paus" type="entypo" size={40} onPress={()=> this._onPaus()} /> : 
                          <Icon  iconStyle={{shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          
                          elevation: 5,}}name="play-circle-filled" type="materialicons" color="blue" size={40} onPress={()=> this._onPlay()} />}
                  </Animated.View>

              </Animated.View>

              <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongDetailsOpacity, flex: 1, justifyContent:'center', alignItems:'center'}}>
              { !this.state.hasLoaded && <Spinner />}
            <Animated.Text onPress={() => this.onTouchPlayer()} style={{ fontSize: 18, paddingLeft: 10, marginBottom:20 }}>{podcast.name}</Animated.Text>
                <View>

                 
                </View>

                <View>

              <CircularPlayer shouldSetTime={!this.state.canScrollUp} setCurrentTime={this.props.actions.setCurrentTime} />
              
                </View>

                <View style={{ width:SCREEN_WIDTH-100, height:60, flexDirection: 'row', justifyContent: 'space-between', marginBottom:10 }}>
                <Icon name="replay-5" type="materialicons" size={40} />
                  
                  {this.state.isPlaying ? 
                  <Icon  iconStyle={{shadowColor: "#000",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,

                  elevation: 24,}} name="controller-paus" type="entypo" size={60} onPress={()=> this._onPaus()} /> :
                  <Icon iconStyle={{shadowColor: "#000",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.00,

                  elevation: 24,}} name="play" type="feather" size={50} onPress={()=> this._onPlay()} />}
                  <Icon name="skip-forward" type="feather" size={40} /> 
                
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 11.14,
    elevation: 8
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