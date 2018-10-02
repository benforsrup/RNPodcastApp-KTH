import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
  Image,
  Slider
} from "react-native";
import Comments from '../components/Comments/Comments'
// import Player from '../components/Player/Player'
import PodCastPlayer from '../components/Player/PodCastPlayer'

class PlayerView extends Component {

  render() {
    return (
        <View>      
          <PodCastPlayer />
          <Comments />
        </View>
    );
  }
}
export default PlayerView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});