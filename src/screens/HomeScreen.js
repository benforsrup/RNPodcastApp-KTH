import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button, 
    Dimensions
} from "react-native";

import Comments from '../components/Comments/Comments'
import PodCastPlayer from '../components/Player/PodCastPlayer'
import * as actions from "../redux/actions";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux'
const SCREEN_HEIGHT = Dimensions.get('window').height

class HomeScreen extends Component {
    constructor(props){
        super(props)

        
    }

    componentDidMount(){
        //set navigation options
        this.props.actions.requestCommentByPodcast(this.props.podcast.id)
        
    }
    render() {
        return ( 
                <View  >
                    <PodCastPlayer podcast={this.props.podcast} />
                    <Comments podcast={this.props.podcast} styling={{marginTop:25, height: SCREEN_HEIGHT - 126, marginBottom:30}} />
                </View>
        );
    }
}
  

const mapStateToProps = state => ({ 
    commentList: state.comments 
  });
  
  const mapDispatchToProps = dispatch =>({
      actions: bindActionCreators( actions , dispatch)
  })
  
  
export default connect(null, mapDispatchToProps)(HomeScreen);
const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
       backgroundColor:'gray'
    }
});