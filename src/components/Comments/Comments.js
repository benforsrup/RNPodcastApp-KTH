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

import { connect } from 'react-redux'

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
        console.log(this.state)
        const comment ={
            title: this.state.comment,
            id: 20,
            time: 5, 
            user:"Oscar", 
            isParent: true,
            hasReplies: false,
            showReply: false,
        }
        this.numberOfComments = this.props.commentList.length
        this.props.actions.addComment(comment)
        setTimeout(() =>this.refs._commentList.scrollToEnd(), 200)
        this.setState({comment:""})
        //console.log(this.state.data, joined)
    }
    _keyExtractor = (item, index) => index.toString();

    showReply = (index) => {
        this.props.actions.toggleReply(index)
    }
    _addReply = (item) => {
        console.log(item)
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
        const reply ={
            title: this.state.reply,
            id: 100,
            user:"Emil",
            isParent: false,
            parentId: id
        }
        this.props.actions.toggleHasReply(id)
        this.props.actions.addComment(reply)
        this.setState({isReplying:false, reply:""})
    }

    _renderItem = ({item, index}) => { 

        return(
        <View>
            <Comment 
                id={item.id}
                data={item}
                index={index}
                isSmall={false}
                replyComment= {item.isParent ? this._addReply : null}
                isPreview={false}
                customStyling={item.isParent ? {width: SCREEN_WIDTH} : {width:SCREEN_WIDTH - 30}}
                onReplyClick={this.showReply}
            />
             {(item.hasReplies && item.showReply) && 
             <View>
                <FlatList 
                style={{marginLeft:30, backgroundColor:'gray'}}
                keyExtractor={this._keyExtractor}
                data={item.replies}
                extraData={item.replies}
                renderItem={this._renderItem}
            />
            </View>
            } 
            {(this.state.isReplying && item.showReply) &&
                <View style={{flexDirection:'row', marginLeft:30, backgroundColor:'gray'}}> 
                <Avatar
                    containerStyle={{flex:0, marginRight:10}}
                    medium
                    rounded
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"}}
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
        const { commentList, player  } = this.props

        //filtering and mapping comments
        const topComment = commentList.map((parent_comment) => {
            if(parent_comment.isParent){
                let replies = commentList.filter((comment)=>{
                    return (!comment.isParent && (comment.parentId ==parent_comment.id ))
                }) 
                if(replies.length > 0){
                    parent_comment.hasReplies = true
                }
                parent_comment.replies = replies
                return parent_comment
            }
            return parent_comment
        }).filter((comment) => comment.isParent).filter((comment) => comment.time < (player.currentTime + 30))

        return (
            <View style={[styles.commentContainer, this.props.styling]}>
           


                <View style={styles.container}>
                { topComment.length > 0 ?
                
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        ref='_commentList'
                        keyExtractor={this._keyExtractor}
                        data={topComment}
                        extraData={topComment}
                        renderItem={this._renderItem}
                    />

                  :
                  <View>
                  <Icon
                        iconStyle={{fontSize:40}}
                      name='circle-with-plus'
                      type='entypo'
                      color='#517fa4'
                  />
                  <Text> Add comment!</Text>
                  </View>

              }
                </View> 
                <View style={{flexDirection:'row', marginLeft:20}}>
            <Avatar
                containerStyle={{flex:0, marginRight:10}}
                medium
                rounded
                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7} />
            <TextInput placeholder={'Add a comment'} value={this.state.comment} 
            ref='_textInput'
            autoCorrect={false}
            style={{flex:1}}
            onSubmitEditing={this.addComment}
            onChangeText={(comment) => this.setState({comment})} />
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
      justifyContent: 'center',
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
