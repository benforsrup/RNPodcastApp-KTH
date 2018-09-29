import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Button
} from "react-native";
import moment from 'moment'
import { Avatar, Badge, Icon } from 'react-native-elements'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

class Comments extends Component {


    getFormattedTime(seconds){
        return moment("2015-01-01").startOf('day').seconds(seconds).format('H:mm:ss');
      }

    render() {
        return (
            <View style={{borderBottomWidth:1,borderBottomColor:'gray', paddingBottom:5}}>
            <View style={styles.commentContainer}>

                <Avatar
                containerStyle={{flex:0, marginRight:10}}
                medium
                rounded
                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg"}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7} />

                <View style={{flex:1, flexDirection:'column'}}>
                    <View style={{flexDirection:'row', paddingBottom: 10, alignItems:'center'}}>
                        <Text style={styles.titleStyle}>{this.props.data.user} </Text>
                        <Badge style={styles.timeStyle}value={this.getFormattedTime(this.props.data.time)} textStyle={{fontWeight:'bold'}} />
                    </View>
                
                    <Text style={styles.commentStyle} > {this.props.data.title} </Text>
                    
                </View>
                
            </View> 

                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', display:'flex'}}>
                    <View style={{flexDirection:'row', marginLeft:15}}>
                        <Icon name="thumb-up" type="materialicon" iconStyle={{fontSize:20}} /> 
                        <Text style={{marginRight:20}}> 10 </Text>
                        <Icon name="thumb-down" type="materialicon" iconStyle={{fontSize:20}} /> 
                    </View>
                    <Icon name="chevron-down" type="entypo" />
                    <View><Text style={{marginRight:50, fontWeight:'700', fontSize:15, color:'gray'}}> Reply</Text></View>
                </View>

            </View>
        );
    }
}
export default Comments;

const styles = StyleSheet.create({
    commentContainer :{
      width:SCREEN_WIDTH,
      display:'flex',
      paddingLeft:10,
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row',  
    },
    titleStyle:{
        backgroundColor:'white',
        fontWeight:'bold',
        fontSize:15,
        marginLeft: 5,
        marginRight: 10
    },
    timeStyle:{
        color:'gray',
    },
    commentStyle:{
        marginTop:5,
        marginBottom:5
    }
  });