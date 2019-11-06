import React from 'react';
import {Provider} from 'react-redux';
import Application from './Application'
import Store from './store/store'

console.disableYellowBox = true;

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Application />
      </Provider>
    )
  }
}