import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

import Comments from '../components/Comments/Comments'
import Player from '../components/Player/Player'
class HomeScreen extends Component {
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
        //set navigation options
    }
    render() {
        console.log(this.props)
        return (     
                <View>
                    <Player podcast={this.props.podcast} />
                    <Comments />
                </View>  
        );
    }
}
  
export default HomeScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});