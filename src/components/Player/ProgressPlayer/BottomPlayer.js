import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes, Dimensions, Animated } from 'react-native';
import { Slider } from 'react-native-elements'
import moment from 'moment'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


function getFormattedTime(seconds){
  return moment("2015-01-01").startOf('day').seconds(seconds).format('H:mm:ss');
}
function getFormattedDuration(duration){
  return moment("2015-01-01").startOf('day').seconds(duration).format('H:mm:ss');
}

class ProgressBar extends ProgressComponent {
  
    componentDidMount(){
      this.setState({currentTime: this.getProgress()})
    }
    componentDidUpdate(prevProps, nextProps) {
      if(this.state.position != nextProps.position && this.props.shouldSetTime){
        this.props.setCurrentTime(nextProps.position)
      }      
    }


  onTimeLineChange(value){
    let time = (value/100)*this.state.duration
    TrackPlayer.seekTo(time)
    //this.setState({currentTime:value})
  }

  render() {
    const {position, duration} = this.state
    return (
      <Animated.View style={[{height: !this.props.shouldSetTime ? 0 : 40, opacity: !this.props.shouldSetTime ? 0 : 100}, styles.bottomTimeLineStyle]}>
          <Text style={{fontWeight:"bold", color:'rgb(135,206,250)', width:'17%'}}> {getFormattedTime(position)}</Text>
          <Slider
              style={{ width: '60%' }}
              step={0.1}
              minimumValue={0}
              maximumValue={100}
              thumbStyle={{width:15, height:15}}
              value={this.getProgress()*100}
              onValueChange={(value)=>this.setState({currentTime: value})}
              onSlidingComplete={(value) => this.onTimeLineChange(value)}
                    />
          <Text style={{width:'16%'}}> {getFormattedDuration(duration)}</Text>
        </Animated.View>
    //   <View style={styles.progress}>
    //     <View style={{ flex: this.getProgress(), backgroundColor: 'red' }} />
    //     <View style={{ flex: 1 - this.getProgress(), backgroundColor: 'grey' }} />
    //   </View>
    );
  }
}

function ControlButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Text style={styles.controlButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}


export default class BottomPlayer extends Component {
  render() {

    return (
        <ProgressBar {...this.props}/>
    );
  }
}

const styles = StyleSheet.create({
  
  bottomTimeLineStyle:{
    width: SCREEN_WIDTH,
    paddingLeft:10,
    paddingRight:10,
    alignItems: 'center', 
    flexDirection:'row',
    justifyContent:'space-between'
  },
});