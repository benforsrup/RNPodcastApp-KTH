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

    componentDidMount(){
        

    }

    _keyExtractor = (item, index) => index.toString();

    showReply = (index) => {
        console.log(index)
        this.props.actions.toggleReply(index)
    }
    _addReply = (item) => {
        //if already open
        if(item.showReply){
            this.setState({isReplying:true})
        }
        else{
            this.props.actions.toggleReply(item.id)
            this.setState({isReplying:true})

        }
        
            
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
            podcastid: this.props.podcast.id
        }
        this.props.actions.requestAddComment(reply)
        this.props.actions.toggleHasReply(id)
        setTimeout(() => this.setState({isReplying:false, reply:""}), 1000)
    }


 
    _renderItems = ({item, index}) => { 
        return(
        <View>
            <Comment 
                id={item.id}
                data={item}
                index={index}
                variant="default"
                replyComment= {item.isParent ? this._addReply : null}
                isPreview={false}
                customStyling={item.isParent ? {width: SCREEN_WIDTH} : {width:SCREEN_WIDTH - 30}}
                onReplyClick={this.showReply}
            />
            {item.hasReplies && 
             <View>
                <FlatList 
                style={{marginLeft:30, backgroundColor:'gray'}}
                keyExtractor={this._keyExtractor}
                data={item.replies}
                extraData={item.replies}
                renderItem={this._renderItems}
            />
            </View>
            } 
            {(this.state.isReplying && item.showReply) &&
                <View style={{flexDirection:'row', marginLeft:30, backgroundColor:'gray'}}> 
                <Avatar
                    containerStyle={{flex:0, marginRight:10}}
                    medium
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
            </View>
        )

    };
    
    

    render() {
        const userProfile = firebase.auth().currentUser.providerData[0] ? firebase.auth().currentUser.providerData[0].photoURL : ""
        const topComment = [this.props.comment]
        return (
            <View style={[styles.commentContainer, this.props.styling]}>
                <View style={styles.container}>  
                <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        ref='_commentList'
                        keyExtractor={this._keyExtractor}
                        data={topComment}
                        renderItem={this._renderItems}/>
                </View> 
            </View> 
        );
    }
}


const mapStateToProps = state => ({ 
    player: state.player  
});

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators( actions , dispatch)
  
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentsInd);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor:'rgba(220,220,220, 0.5)'
    },
    commentContainer :{
      width:SCREEN_WIDTH,
      height:SCREEN_HEIGHT-80,
      zIndex:-1  
    },
    plusButton: {
        textAlign:'right',
        marginRight:10,
        marginBottom:10
    }
  });
