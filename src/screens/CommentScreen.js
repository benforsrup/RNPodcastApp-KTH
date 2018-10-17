import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

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
                    <CommentsInd comment={this.props.comment} podcast={this.props.podcast}  />
                </View>
        );
    }
}
  
export default CommentScreen
const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
      
    }
});