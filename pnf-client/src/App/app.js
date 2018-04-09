import React, { Component } from 'react';
import './app.css';

import PhotoPanel from '../PhotoPanel/PhotoPanel';
import AlbumButton from '../AlbumButton/AlbumButton';
import { createStore } from 'redux';
import reducer from '../AlbumButton/Reducers';

let store = createStore(reducer);
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
            <PhotoPanel store={store}/>
        </div>
      </div>
    );
  }
}

export default App;