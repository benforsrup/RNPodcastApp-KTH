import React, { Component } from 'react';
import {
    SafeAreaView,
     StyleSheet
  } from 'react-native';
  

const withSafeWrapper = (MyComponent) =>
    class StoreWrapper extends Component {
        render() {
            
            return (
                    <MyComponent {...this.props} />
            );
        }
    };

    const styles = StyleSheet.create({
        safeArea: {
          flex: 1,
          
        }
      })
export default withSafeWrapper;