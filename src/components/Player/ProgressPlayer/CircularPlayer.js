import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes, Dimensions } from 'react-native';
import { Slider } from 'react-native-elements'
import * as actions from "../../../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
import CircularSlider from '../../Timeline/CircularSlider'
import CircleSlider from '../../Timeline/CircleSlider'

import { Navigation } from 'react-native-navigation'
import moment from 'moment'
import Comment from '../../Comments/Comment'


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

function getFormattedTime(seconds){
  return moment("2015-01-01").startOf('day').seconds(seconds).format('H:mm:ss');
}
function getFormattedDuration(duration){
  return moment("2015-01-01").startOf('day').seconds(duration).format('H:mm:ss');
}

class ProgressBar extends ProgressComponent {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.setState({angle:0})
  }
  componentDidUpdate(prevProps, nextProps) {
    let currAngle = this.getProgress()*360
    if(this.state.position != nextProps.position && this.props.shouldSetTime){
      this.props.setCurrentTime(nextProps.position)
      this.setState({angle: currAngle})
    }
    
    if(currAngle != this.state.angle && !this.props.shouldSetTime){
      this.setState({angle: currAngle})
    }
  }

  _updateCircularTimeline = (value) =>{
    //this.setState({angle: value})
    let time  = (value*this.state.duration)/360  
    TrackPlayer.seekTo(time)
    this.setState({angle:value})
  }

  goToScreenPreview = async ({reactTag}) => {
    console.log("yh")
    await Navigation.push("PodcastListView", {
        component: {
          name: 'CommentScreen',
          options: {
            animations: {
              push: {
                enable: false
              }
            },
            topBar:{
                visible:true
            },
            preview: reactTag ? {
              reactTag,
              height: 500,
              commit: true,
            } : undefined,
          }
        }
      });
  }

goToScreen = async () => {
    await Navigation.push("PodcastListView", {
        component: {
            name: "CommentScreen",
            options:{
                topBar:{
                    visible:true,
                }, 
            }
        }
    })
  }

  render() {    
    const {commentList} = this.props
    //const topComment = commentList.comments.filter(comment =>   Math.abs(this.state.position - comment.time)<30)|| ""
    return (
        <View >

            {/* <Navigation.TouchablePreview
                  
                  onPress={() => this.goToScreen()}
                   onPressIn={({reactTag}) => this.goToScreenPreview({reactTag})}
                  >
                <Text style={{backgroundColor:'blue', padding:10}}> {topComment.length > 0 ? topComment[0].title: "No Comment"}</Text>
                </Navigation.TouchablePreview> */}


            <View style={{justifyContent: 'center', flexDirection:'row', marginBottom:10}}>
            <Text style={{fontWeight:"bold", color:'rgb(135,206,250)'}}>  {getFormattedTime(this.state.position)}  / </Text> 
            <Text> {getFormattedDuration(this.state.duration)}</Text>
            </View>

            
             
            
            {/* <View style={{ justifyContent:'center', width:SCREEN_WIDTH-65, height:SCREEN_WIDTH-65,alignItems: 'center', zIndex: 1}}>
            <View style={{width: SCREEN_WIDTH-140, height:SCREEN_WIDTH-220, position:'absolute', top:80, left:40,zIndex:10}}> 
              <Navigation.TouchablePreview
                  onPress={() => this.goToScreen()}
                   onPressIn={({reactTag}) => this.goToScreenPreview({reactTag})}>

                  {topComment.length > 0 ?
                  <View>
                      <Comment 
                          id={topComment[0].id} 
                          data={topComment[0]} 
                          isSmall={true}
                          index={topComment[0].id}
                          customStyling={styles.customCommentStyle} /> 
                          
                          <View style={{
                            backgroundColor:'#F3F3F3',
                            height:'100%',
                            width:SCREEN_WIDTH-150, 
                            position:'absolute', 
                            top:7,
                            borderRadius:10,
                            
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,

                            elevation: 2,
                            shadowColor: "#000",
                            zIndex:-1, 
                            left:7.5}}></View>

                            <View style={{
                            backgroundColor:'#F9F9F9',
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,

                            elevation: 2,
                            height:'100%',
                            width:SCREEN_WIDTH-180, 
                            position:'absolute', 
                            top:14,
                            borderRadius:10,
                            zIndex:-2, 
                            left:20}}></View>

                          </View> 
                          : 
                      
                      <Text> No Comment</Text> }

                </Navigation.TouchablePreview> 

            </View>
           
             <CircularSlider 
                  width={SCREEN_WIDTH-20} 
                  height={SCREEN_WIDTH-20}
                  meterColor='#0cd' 
                  textColor='#fff'
                  value={this.state.angle}
                  onValueChange={(value)=> this._updateCircularTimeline(value)}
                  /> 
                  </View> */}
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
  customCommentStyle:{
    width: SCREEN_WIDTH-140,
    borderWidth: 1.5,
    borderColor:'rgba(0,0,0,0.1)',
    borderRadius: 10,
    backgroundColor:'white',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,

    // elevation: 7,
  }
});