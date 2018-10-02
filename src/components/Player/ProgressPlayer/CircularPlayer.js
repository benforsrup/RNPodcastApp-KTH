import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements'
import * as actions from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import CircularSlider from '../../Timeline/CircularSlider'
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

  componentDidUpdate(prevProps, nextProps) {
    if(this.state.position != nextProps.position && this.props.shouldSetTime){
      this.props.setCurrentTime(nextProps.position)
    }
  }


  render() {    
    const {commentList} = this.props
    const topComment = commentList.comments.filter(comment =>   Math.abs(this.state.position - comment.time)<11)|| ""
    return (
        <View >
            <View style={{justifyContent: 'center', flexDirection:'row'}}>
            <Text style={{fontWeight:"bold", color:'rgb(135,206,250)'}}>  {getFormattedTime(this.state.position)}  / </Text> 
            <Text> {getFormattedDuration(this.state.duration)}</Text>
            </View>
            
             <View style={{width: SCREEN_WIDTH-100, height:SCREEN_WIDTH-100, position:'absolute', top:0, left:0}}>
              
              <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <Text> {topComment.length > 0 ? topComment[0].title: "No Comment"}</Text>
              </View>

            </View>

            <CircularSlider 
                  width={SCREEN_WIDTH-100} 
                  height={SCREEN_WIDTH-100} 
                  meterColor='#0cd' 
                  textColor='#fff'
                  value={0}
                  // onValueChange={(value)=> {this._updateTimeValue(value)}}
                  />
        </View>

    );
  }
}


class CircularPlayer extends Component {
  render() {
    return (
      <View >
        <ProgressBar {...this.props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(CircularPlayer);





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