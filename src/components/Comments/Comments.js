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
import * as actions from "../../redux/actions";
import { bindActionCreators } from "redux";
import { Icon } from 'react-native-elements' 

import { connect } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width




class Comments extends Component {
    constructor(props){
        super(props)
    
    }

    componentDidMount(){
        

    }

    addComment(){
        console.log(this.props)
        //console.log(this.state.data, joined)
    }
    _keyExtractor = (item, index) => index.toString();


    _renderItem = ({item, index}) => ( 
            <Comment 
                id={item.id}
                data={item}
            />
    );

    render() {
        const { commentList, player  } = this.props
        const topComment = commentList.comments.filter(comment =>   Math.abs(player.currentTime - comment.time)<11)|| ""
        
        return (
            <View style={styles.commentContainer}>
            
                <View style={styles.container}>
                { topComment.length > 0 ?
                <ScrollView
                    scrollEnabled={true}
                    scrollEventThrottle={16}>
                    <FlatList 
                        keyExtractor={this._keyExtractor}
                        data={topComment}
                        extraData={topComment}
                        renderItem={this._renderItem}
                    />
                  </ScrollView>
                  :
                  <View>
                  <Icon
                        iconStyle={{fontSize:40}}
                      name='circle-with-plus'
                      type='entypo'
                      color='#517fa4'
                  />
                  <Text> Add comment!</Text>
                  </View>

              }
                </View> 
            
                
            </View> 
        );
    }
}


const mapStateToProps = state => ({ 
    commentList: state.comments,
    player: state.player
     
});

const mapDispatchToProps = dispatch =>({
    actions: bindActionCreators( actions , dispatch)
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

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
