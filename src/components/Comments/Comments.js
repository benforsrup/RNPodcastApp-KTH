import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    FlatList,
    ScrollView,
    Button
} from "react-native";
import Comment from './Comment'
import * as actions from "../../redux/actions";
import { bindActionCreators } from "redux";
import { Icon, Avatar } from 'react-native-elements'
import {TextInput} from '@shoutem/ui'

import { connect } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width




class Comments extends Component {
    constructor(props){
        super(props)
        this.state = {
            showReply: false,
            text:""
        }
    }

    componentDidMount(){
        

    }

    addComment=()=>{
        console.log(this.state)
        const comment ={
            title: this.state.text,
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
        this.setState({text:""})
        //console.log(this.state.data, joined)
    }
    _keyExtractor = (item, index) => index.toString();

    showReply = (index) => {
        this.props.actions.toggleReply(index)
    }

    _renderItem = ({item, index}) => { 
        let replies = this.props.commentList.filter((comment) => {
            if(!comment.isParent && comment.parentId == item.id){
                return comment
            }
        })


        return(
        <View>
            <Comment 
                id={item.id}
                data={item}
                index={index}
                isSmall={false}
                isPreview={false}
                customStyling={{width: SCREEN_WIDTH}}
                onReplyClick={this.showReply}
            />
             {(item.hasReplies && item.showReply) && 
                <FlatList 
                style={{marginLeft:30, backgroundColor:'gray'}}
                keyExtractor={this._keyExtractor}
                data={replies}
                extraData={replies}
                renderItem={this._renderItem}
            />
            } 
            </View>
        )

    };
    
    

    render() {
        const { commentList, player  } = this.props
        const topComment = commentList.filter((comment) => comment.isParent)
        
        return (
            <View style={[styles.commentContainer, this.props.styling]}>
            <View style={{flexDirection:'row', marginLeft:20}}>
            <Avatar
                containerStyle={{flex:0, marginRight:10}}
                medium
                rounded
                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7} />
            <TextInput placeholder={'Add a comment'} value={this.state.text} 
            onSubmitEditing={this.addComment}
            onChangeText={(text) => this.setState({text})} />
            </View>


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
