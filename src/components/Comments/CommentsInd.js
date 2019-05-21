import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    TextInput,
    ScrollView,
    Button
} from "react-native";
import Comment from './Comment'
import * as actions from "../../redux/actions";
import { bindActionCreators } from "redux";
import { Icon, Avatar } from 'react-native-elements'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width




class CommentsInd extends Component {
    constructor(props){
        super(props)
        this.state = {
            showReply: false,
            comment:"",
            reply:"",
            isReplying:false,
        }
    }

    _keyExtractor = (item, index) => index.toString();

    showReply = (index) => {
        this.props.actions.toggleReply(index)
    }
    _addReply = (item) => {
        console.log(item)
        //if already open
        
        this.setState({isReplying:true})
          
    }
    _upvoteComment = (id, inc) => {
        this.props.actions.requestUpvote(id, inc)
    }

    addReply = (id) => {
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
        setTimeout(() => this.setState({isReplying:false, reply:""}), 1000)
        setTimeout(() => this.refs._commentList && this.refs._commentList.scrollToEnd(), 1000)
    }


 
    _renderItems = ({item, index}) => { 
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
        <View>
            <Comment 
                id={item.id}
                data={item}
                isInCommentScreen={true}
                index={index}
                onUpvote={this._upvoteComment}
                variant="default"
                replyComment= {item.isParent ? this._addReply : null}
                isPreview={false}
                customStyling={customStyling}
                onReplyClick={this.showReply}
            />
            {item.hasReplies && 
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
                renderItem={this._renderItems}
            />
            </View>
            } 
           
            
            </View>
        )

    };
    
    

    render() {
        const userProfile = firebase.auth().currentUser.providerData[0] ? firebase.auth().currentUser.providerData[0].photoURL : ""
        const topComment = [this.props.comment]
        const starredComment = this.props.comments.filter((comment) => comment.id == this.props.comment.id)
        console.log(starredComment)
        return (
            <View style={[styles.commentContainer, this.props.styling]}>
                <View style={styles.inputStyle}>
                    <Avatar
                        containerStyle={{flex:0, marginRight:10, marginLeft: 20}}
                        small
                        rounded
                        source={{uri: userProfile}}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7} />
                    <TextInput placeholder={'Add a reply'} value={this.state.reply} 
                    ref='_replyInput'
                    autoCorrect={false}
                    style={{flex:1}}
                    onSubmitEditing={() => this.addReply(this.props.comment.id)}
                    onChangeText={(reply) => this.setState({reply})} />
                    </View>
                 
                <View style={styles.container}>  
                <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        ref='_commentList'
                        keyExtractor={this._keyExtractor}
                        data={starredComment}
                        renderItem={this._renderItems}/>
                 
                </View> 
                
            </View> 
        );
    }
}


const mapStateToProps = state => ({ 
    player: state.player,
    comments: state.comments  
});

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators( actions , dispatch)
  
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsInd);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
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
