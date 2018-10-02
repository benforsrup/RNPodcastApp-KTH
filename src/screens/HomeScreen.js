import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

import Comments from '../components/Comments/Comments'
import PodCastPlayer from '../components/Player/PodCastPlayer'

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
                <View >
                    <PodCastPlayer podcast={this.props.podcast} />
                    <Comments  />
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