import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

import React, { Component } from 'react';
import './app.css';

import PhotoPanel from '../PhotoPanel/PhotoPanel';
import AlbumButton from '../AlbumButton/AlbumButton';
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='container'>
            // Todo : Photopanel
            <AlbumButton />
            <PhotoPanel />
        </div>
      </div>
    );
  }
}

export default App;