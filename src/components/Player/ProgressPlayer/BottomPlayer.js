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


  onTimeLineChange(value){
    let time = (value/100)*this.state.duration
    TrackPlayer.seekTo(time)
    this.setState({currentTime:value})
    console.log(this.getProgress())
  }

  render() {
    const {position, duration} = this.state
    return (
      <Animated.View style={[{height: this.props.height}, this.props.styling]}>
          <Text> {getFormattedTime(position)}</Text>
            <Slider
                style={{ width: SCREEN_WIDTH-120, marginLeft:5, marginRight:5 }}
                step={0.1}
                minimumValue={0}
                maximumValue={100}
                thumbStyle={{width:15, height:15}}
                value={this.state.currentTime}
                onValueChange={(value)=>this.setState({currentTime: value})}
                onSlidingComplete={(value) => this.onTimeLineChange(value)}
                      />
          <Text> {getFormattedDuration(duration)}</Text>
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
  card: {
    width: '80%',
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: 'center',
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1},
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: 'grey',
  },
  progress: {
    height: 1,
    width: '90%',
    marginTop: 10,
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
  },
  artist: {
    fontWeight: 'bold',
  },
  controls: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  controlButtonContainer: {
    flex: 1,
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});