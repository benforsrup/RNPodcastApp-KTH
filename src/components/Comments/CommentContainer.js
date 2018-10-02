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


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width




class CommentContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            showReply: false
        }
    }

    componentDidMount(){
        

    }

   
    
    

    render() {

        return (
            <View >
            
               
            
                
            </View> 
        );
    }
}




export default CommentContainer;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:30,
      borderTopWidth:1,
      borderTopColor:'gray',
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
