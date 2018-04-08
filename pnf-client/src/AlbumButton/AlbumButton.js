import './AlbumButton.css';
import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

class AlbumButton extends React.Component {

  render() {
    // Photo is in PhotoPanel so PhotoCard only need to show it
    return (
      <div className="AlbumButton-container">
        <div className='row'>      
          <div className='col s12 m6 l6'>
            <button className="waves-effect waves-light btn">Sharks</button>
          </div>
          <div className='col s12 m6 l6'>
            <button className="waves-effect waves-light btn">Cats</button>
          </div>                    
        </div> {/* End of 'row'*/}
      </div> 
    );
  }
}

export default AlbumButton;