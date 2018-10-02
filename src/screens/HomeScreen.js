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
const SCREEN_HEIGHT = Dimensions.get('window').height

import { Navigation } from 'react-native-navigation'
class HomeScreen extends Component {
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
        //set navigation options
    }
    render() {
        return ( 
                <View  >
                    <PodCastPlayer podcast={this.props.podcast} />
                    <Comments styling={{marginTop:25}} />
                </View>
        );
    }
}
  
export default HomeScreen
const styles = StyleSheet.create({
    container: {
        borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
       backgroundColor:'gray'
    }
});