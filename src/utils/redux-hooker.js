import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    StyleSheet,
  } from 'react-native';

const withReduxStoreWrapper = (MyComponent, store) =>
    class StoreWrapper extends Component {
        render() {
            
            return (
                
                <Provider store={store}>
                    <MyComponent {...this.props} />
                </Provider>
                
            );
        }
    };

    const styles = StyleSheet.create({
        safeArea: {
          flex: 1
        }
      })

export default withReduxStoreWrapper;