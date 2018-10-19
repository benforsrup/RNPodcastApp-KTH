import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button
} from "react-native";
import Comment from './Comment'
import * as actions from "../../redux/actions";
import { bindActionCreators } from "redux";
import { Icon, Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { Navigation } from 'react-native-navigation'
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width




class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            showReply: false,
            comment:"",
            reply:"",
            isReplying:false,
        }
    }

    componentDidMount(){
        

    }

    addComment=()=>{
        const comment={
            title: this.state.comment,
            id: 20,
            time: this.props.player.currentTime, 
            user:{
                name: firebase.auth().currentUser.displayName, 
                image: firebase.auth().currentUser.providerData[0] ? firebase.auth().currentUser.providerData[0].photoURL : ""
            }, 
            isParent: true,
            hasReplies: false,
            showReply: false,
            upvotes: 0,
            podcastid: this.props.podcast.id
        }
        this.props.actions.requestAddComment(comment)
        this.numberOfComments = this.props.commentList.length
        setTimeout(() => this.refs._commentList ? this.refs._commentList.scrollToEnd(): null, 200)
        this.setState({comment:""})
    }
    _keyExtractor = (item, index) => index.toString();

    showReply = (index) => {
        this.props.actions.toggleReply(index)
    }
    _addReply = (item) => {
        //if already open
        if(item.showReply && !item.hasReplies){
            this.setState({isReplying:false})
        }
        else if(item.showReply && item.hasReplies){
            this.setState({isReplying:true})
        }
        else{
            this.setState({isReplying:true})

        }
        this.props.actions.toggleReply(item.id)
   
            
    }
    addReply = (id) => {
        console.log(id)
        const reply ={
            title: this.state.reply,
            user:{
                name: firebase.auth().currentUser.displayName, 
                image: firebase.auth().currentUser.providerData[0] ?  firebase.auth().currentUser.providerData[0].photoURL :  ""
            }, 
            isParent: false,
            parentId: id,
            upvotes: 0,
            podcastid: this.props.podcast.id
        }
        this.props.actions.requestAddComment(reply)
        this.props.actions.toggleHasReply(id)
        setTimeout(() => this.setState({isReplying:false, reply:""}), 1000)
    }

    goToCommentScreen = async (comment) => {
        console.log("logged")
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
      _upvoteComment = (id, inc) => {
          this.props.actions.requestUpvote(id, inc)
      }

    _renderItem = ({item, index}) => { 
        const customStyling = item.isParent ? 
            {
                width: SCREEN_WIDTH-16,
                marginLeft: 8,
                marginRight: 8,
                
                backgroundColor: "#E6EDF4"
            } : 
            {  
                marginTop:2,
                width:SCREEN_WIDTH - 30
            }
        return(
        <TouchableOpacity onPress={()=> this.goToCommentScreen(item)} activeOpacity={0.9} style={{marginBottom: 8}}>
            <Comment 
                id={item.id}
                data={item}
                index={index}
                onUpvote={this._upvoteComment}
                variant="default"
                replyComment= {item.isParent ? this._addReply : null}
                isPreview={false}
                customStyling={customStyling}
                onReplyClick={this.showReply} />
             {(item.hasReplies && item.showReply) && 
             <View style={{
                backgroundColor: "#E6EDF4",
                width: SCREEN_WIDTH-16,
                marginLeft: 8,
                marginRight: 8,
                 paddingBottom: 7
             }}>
                <FlatList 
                style={{marginLeft:30}}
                keyExtractor={this._keyExtractor}
                data={item.replies}
                extraData={item.replies}
                renderItem={this._renderItem}
            />
            </View>
            } 
            {(this.state.isReplying && item.showReply) &&
                <View style={{flexDirection:'row', backgroundColor:'#E6EDF4', width: SCREEN_WIDTH-16,
                marginLeft: 8,
                marginRight: 8,}}> 
                <Avatar
                    containerStyle={{flex:0, marginRight:10}}
                    small
                    rounded
                    source={{uri:firebase.auth().currentUser.providerData[0] ? firebase.auth().currentUser.providerData[0].photoURL : ""}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7} />
                <TextInput value={this.state.reply} 
                placeholder="Add reply"
                autoFocus={true}
                style={{flex:1}}
                autoCorrect={false}
                onChangeText={(reply) => this.setState({reply})}
                onSubmitEditing={() => this.addReply(item.id)}/>
                </View>
            }
            </TouchableOpacity>
        )

    };
    
    

    render() {
        const { commentList, player  } = this.props
        const userProfile = firebase.auth().currentUser.providerData[0] ? firebase.auth().currentUser.providerData[0].photoURL : ""
        const topComment = commentList.map((parent_comment) => {
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
        }).filter((comment) => comment.isParent).filter(comment =>   Math.abs(player.currentTime - comment.time)<30)

        return (
            <View style={[styles.commentContainer, this.props.styling]}>
            <View style={styles.inputStyle}>
                    <Avatar
                        containerStyle={{flex:0, marginRight:10, marginLeft: 20}}
                        small
                        rounded
                        source={{uri: userProfile}}
                        
                        activeOpacity={0.7} />
                    <TextInput placeholder={'Add a comment'} value={this.state.comment} 
                    ref='_textInput'
                    autoCorrect={false}
                    style={{flex:1}}
                    onSubmitEditing={this.addComment}
                    onChangeText={(comment) => this.setState({comment})} />
                </View>
                <View style={styles.container}>
                    
                
                { topComment.length > 0 ?          
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1}}
                        ref='_commentList'
                        keyExtractor={this._keyExtractor}
                        data={topComment}
                        extraData={topComment}
                        renderItem={this._renderItem}/>
                    :
                  <View>
                  <Icon iconStyle={{fontSize:40}} name='circle-with-plus' type='entypo'color='#517fa4'/>
                  <Text> Add comment!</Text>
                  </View>
              }
                </View> 
            
            
                
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    commentContainer :{
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT,
      zIndex:-1 
    },
    plusButton: {
        textAlign:'right',
        marginRight:10,
        marginBottom:10
    },
    inputStyle:{
        flexDirection:'row', 
        borderWidth: 0.5,
        borderColor: "#B9D8E5", 
        marginBottom: 10, 
        paddingTop: 15, 
        backgroundColor:"#F4F6F7",
        paddingBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    }
  });
