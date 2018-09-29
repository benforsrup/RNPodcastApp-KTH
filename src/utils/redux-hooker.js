import React, { Component } from 'react';
import { Provider } from 'react-redux';

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

export default withReduxStoreWrapper;