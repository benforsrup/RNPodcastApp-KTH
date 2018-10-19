import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Dimensions
} from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height

import CommentsInd from '../components/Comments/CommentsInd'

class CommentScreen extends Component {
    constructor(props){
        super(props)   
    }

    componentDidMount(){
        //set navigation options
    }
    render() {
        return ( 
                <View >
                    <CommentsInd comment={this.props.comment} podcast={this.props.podcast} styling={{height: SCREEN_HEIGHT-100}} />
                </View>
        );
    }
}
  
export default CommentScreen
