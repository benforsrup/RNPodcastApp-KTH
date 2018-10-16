import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { ListItem, List, Flatlist, Icon } from "react-native-elements";
import { Screen, NavigationBar, Image, Title, ListView,ScrollView } from '@shoutem/ui'
import { Navigation } from 'react-native-navigation'

class PodcastChooseView extends Component {
  
    pushBack = () => {
        Navigation.pop(this.props.componentId)
    }

    renderPodcast(podcast){
        console.log(podcast)
        return(
            <TouchableOpacity >
            <View style={{marginTop: 10,padding: 10, backgroundColor: "#B2DBBF", flexDirection:'row', 
             alignItems:'center', justifyContent:'space-between'}}>
                
                <Text style={{fontSize: 12}}>
                    {podcast.name}
                </Text>
                <Icon name='controller-play' type='entypo' />
            </View>
            </TouchableOpacity>
        )
    }

    render() {
        const episodes = this.props.podcast.episodes
        return (
            <Screen >     
                <NavigationBar
                  styleName="inline no-border"
                leftComponent={<Icon onPress={this.pushBack} iconStyle={{marginLeft:10}} name='keyboard-backspace' type='materialicons' />}
                centerComponent={<Title>Podcasts</Title>}
                />

                    <View style={{flex: 1, alignItems:'center', marginTop:20}}>
                    <Image styleName="medium-square" source={this.props.podcast.image}/>
                    <View style={{marginTop:20}}>
                    <ListView 
                        data={episodes}
                        renderRow={this.renderPodcast}
                    />
                    </View>

                   </View>
            </Screen>
        );
    }
}

  
  
export default PodcastChooseView;

const styles = StyleSheet.create({
  container: {   
    marginTop:40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});