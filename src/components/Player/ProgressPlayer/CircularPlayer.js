import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';
import { Image, StyleSheet, Text, TouchableOpacity, View, ViewPropTypes, Dimensions } from 'react-native';
import { Slider, Icon } from 'react-native-elements'
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

  goToScreenPreview = async ({reactTag}, comment) => {
    await Navigation.push("PodcastListView", {
        component: {
          name: 'CommentScreen',
          passProps:{
            podcast:this.props.podcast,
            comment: comment
          },
          options: {
            animations: {
              push: {
                enable: false
              }
            },
            topBar:{
                visible:true,
                title:{
                  text:"Comments"
              }
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

  goToScreen = async (comment) => {
      await Navigation.push("PodcastListView", {
          component: {
              name: "CommentScreen",
              passProps:{
                podcast:this.props.podcast,
                comment: comment
              },
              options:{
                  topBar:{
                      visible:true,
                      title:{
                        text:"Comments"
                      }
                  }, 
              }
          }
      })
    }
  compareUpvotes(a,b) {
    if (a.upvotes < b.upvotes)
        return -1;
    if (a.upvotes > b.upvotes)
      return 1;
    return 0;
  }
    

  render() {    
    const {commentList} = this.props
    const starredComment = commentList.map((parent_comment) => {
      if(parent_comment.isParent){
          let replies = commentList.filter((comment)=>{
              return (!comment.isParent && (comment.parentId == parent_comment.id ))
          }) 
          if(replies.length > 0){
              parent_comment.hasReplies = true
          } 
          parent_comment.replies = replies
          return parent_comment
      }
      return parent_comment
  }).filter((comment) => comment.isParent).filter(comment =>   Math.abs(this.state.position - comment.time)<30)
  .sort(this.compareUpvotes)
  .reverse()
    return (
        <View >
            <View style={{justifyContent: 'center', flexDirection:'row', marginBottom:20, marginTop:20}}>
                <Text style={{fontWeight:"bold", color:'rgb(135,206,250)'}}>  {getFormattedTime(this.state.position)}  / </Text> 
                <Text> {getFormattedDuration(this.state.duration)}</Text>
            </View>
            <View style={styles.circleContainerStyle}>
                <View style={{position:'absolute',width: SCREEN_WIDTH-60, height:SCREEN_WIDTH-60, justifyContent:'center', alignItems:'center'}}>
                    <Image resizeMode={'cover'} source={require('../../../assets/Circular_Bars-hires.png')} style={{flex: 1, width:300, height: 150}} />
                </View>
                <View style={{width: SCREEN_WIDTH-150, height:130, position:'absolute', top:90, left:30,zIndex:10}}> 
                    

                    {starredComment.length > 0 ?
                    <Navigation.TouchablePreview
                      onPress={() => this.goToScreen(starredComment[0])}
                      onPressIn={({reactTag}) => this.goToScreenPreview({reactTag}, starredComment[0])}>
                    <View>
                      <Comment 
                          id={starredComment[0].id} 
                          data={starredComment[0]} 
                          isSmall={true}
                          variant="preview"
                          index={starredComment[0].id}
                          customStyling={styles.customCommentStyle} /> 
                          
                          <View style={{
                            backgroundColor:'#F3F3F3',
                            height:'100%',
                            width:SCREEN_WIDTH-175, 
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
                            left:12.5}}></View>

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
                            width:SCREEN_WIDTH-210, 
                            position:'absolute', 
                            top:14,
                            borderRadius:10,
                            zIndex:-2, 
                            left:30}}></View>

                          </View> 
                           </Navigation.TouchablePreview> 
                          : 
                      
                          <TouchableOpacity onPress={() => this.props.onMinimize()} style={{position:'absolute', top:20, left:65 }}>
                            <Icon iconStyle={{fontSize:40}} name='circle-with-plus' type='entypo' color='#517fa4' />
                            <Text> Add comment!</Text>
                          </TouchableOpacity> }

               

            

            </View>
           
             <CircularSlider 
                  
                  width={SCREEN_WIDTH-60} 
                  height={SCREEN_WIDTH-60}
                  meterColor='#0cd' 
                  textColor='#fff'
                  value={this.state.angle}
                  onValueChange={(value)=> this._updateCircularTimeline(value)}
                  /> 
                  </View>
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
    width: SCREEN_WIDTH-150,
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
  },
  circleContainerStyle:{
    justifyContent:'center', 
    width:SCREEN_WIDTH-90, 
    height:SCREEN_WIDTH-90,
    alignItems: 'center', 
    zIndex: 1
    
  }
});