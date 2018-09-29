import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";
import { Navigation } from 'react-native-navigation';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        
    }

   
    

    goToScreen = (screenName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
                options:{
                    popGesture:false,
                    topBar:{
                        backButton:{
                            visible:false
                        }
                        
                    }
                }
            }
        })
    }

    render() {
        console.log(this.props)
        return (
            <View style={styles.container}>
                <Button title="Press here to login" onPress={()=>this.goToScreen("PodcastListView")}/>
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});