import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button
} from "react-native";
import moment from 'moment'
import { Avatar, Badge, Icon } from 'react-native-elements'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class Comment extends Component {

    constructor(props){
        super(props)
        this.state={
            hasUpvoted:false
        }
    }
    getFormattedTime(seconds){
        return moment("2015-01-01").startOf('day').seconds(seconds).format('H:mm:ss');
      }

    showReply = () => {
        this.props.onReplyClick(this.props.data.id)
    }

    _upvote = () => {
        if(this.state.hasUpvoted){
            this.props.onUpvote(this.props.data.id, -1)
            this.setState({hasUpvoted: false})
        }
        else{
            this.props.onUpvote(this.props.data.id, 1)
            this.setState({hasUpvoted: true})
        }
    }

    renderPreviewVariant = () => {

        return (
            <View style={[this.props.customStyling, {paddingTop: 10, paddingBottom: 10}]}>
            <View style={styles.previewCommentContainer}>

                <Avatar
                containerStyle={{flex:0, marginRight:0, marginLeft:5}}
                small
                rounded
                source={{uri: this.props.data.user.image}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7} />

                <View style={{flex:1, flexDirection:'column'}}>
                    <View style={{flexDirection:'row', paddingBottom: 10, alignItems:'center'}}>
                        <Text style={styles.titleStyle}>{this.props.data.user.name} </Text>
                       {/* { this.props.data.time && <Badge style={styles.timeStyle}value={this.getFormattedTime(this.props.data.time)} textStyle={{fontWeight:'bold'}} /> } */}
                    </View>
                
                    <Text style={styles.commentStyle} > {this.props.data.title} </Text>
                    
                </View>
                
            </View> 

             

            </View>
        )
    }

    renderDefaultVariant = () => {
        const numberOfReplies = (this.props.data.replies && this.props.data.replies.length > 0) ? this.props.data.replies.length: ""

        return (
            <View style={[this.props.customStyling, styles.comStyle]}>
                <View style={styles.commentContainer}>
                    <Avatar
                    small
                    rounded
                    source={{uri: this.props.data.user.image}}
                    activeOpacity={0.7} />

                    <View style={{flex:1, flexDirection:'column'}}>
                        <View style={{flexDirection:'row', paddingBottom: 0, alignItems:'center'}}>
                            <Text style={styles.titleStyle}> {this.props.data.user.name} </Text>
                            { this.props.data.time && <Badge style={styles.timeStyle}value={this.getFormattedTime(this.props.data.time)} textStyle={{fontWeight:'bold'}} /> }

                        </View>
                    
                        <Text style={styles.commentStyle} > {this.props.data.title} </Text>
                        
                    </View>
                
            </View> 

               <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', display:'flex'}}>
                    <View style={{flexDirection:'row', marginLeft:15}}>
                        <Icon name="thumb-up" type="materialicon" iconStyle={{fontSize:20, color: !this.state.hasUpvoted ? "black": 'green' }} onPress={() => this._upvote()}/> 
                        <Text style={{marginRight:20}}> {this.props.data.upvotes ? this.props.data.upvotes: ""} </Text>
                    </View>

                
                {(this.props.data.isParent && this.props.data.hasReplies) &&
                      <View style={{flexDirection:'row', alignItems:'center'}}> 
                          <Text> {numberOfReplies} </Text> 
                          <Icon onPress={() => this.showReply()} name="chevron-down" type="entypo" /> 
                        </View>
                }
                {(this.props.data.isParent && !this.props.isInCommentScreen) && <View>
                     <Text onPress={() => this.props.replyComment(this.props.data)}style={{marginRight:50, fontWeight:'700', fontSize:15, color:'black'}}> Reply</Text>
                </View> }
                
                </View>
             

            </View>
        )
    }


    render() {
        const CommentVariant = this.props.variant === "default" ? this.renderDefaultVariant() : this.renderPreviewVariant()
        return (
            <View>
            { CommentVariant }
            </View>
        );
    }
}
export default Comment;

const styles = StyleSheet.create({
    comStyle:{
        paddingBottom: 10
    },
    commentContainer :{  
      display:'flex',
      paddingLeft:10,
      paddingTop:7,
      paddingBottom:7,
      flexDirection:'row',  
    },
    previewCommentContainer :{  
        display:'flex',
        paddingLeft:5,
        paddingTop:10,
        paddingBottom:20,
        flexDirection:'row',  
      },
    titleStyle:{
       
        fontWeight:'bold',
        fontSize:15,
        marginLeft: 10,
        marginRight: 10
    },
    timeStyle:{
        color:'gray',
        fontSize: 5
        
    },
    commentStyle:{
        marginTop:5,
        marginLeft: 10
    }
  });