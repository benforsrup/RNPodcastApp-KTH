import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import PlayerView from '../containers/PlayerView'
import * as actions from "../redux/actions";
import { bindActionCreators } from "redux";
import { Provider } from 'react-redux'
import store from '../redux/store'
import {Navigation} from 'react-native-navigation'
class HomeScreen extends Component {
    constructor(props){
        super(props)
        
    }

    componentDidMount(){
        //set navigation options
    }
    render() {
        return (     
                <View>
                    <PlayerView />
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