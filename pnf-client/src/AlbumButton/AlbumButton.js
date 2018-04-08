import './AlbumButton.css';
import React from 'react';

class AlbumButton extends React.Component {

  render() {
    // Photo is in PhotoPanel so PhotoCard only need to show it
    return (
      <div className="AlbumButton-container">
        <div className='row'>      
          <div className='col s12 m6 l6'>
            <a className="waves-effect waves-light btn">Sharks</a>
          </div>
          <div className='col s12 m6 l6'>
            <a className="waves-effect waves-light btn">Cats</a>
          </div>                    
        </div> {/* End of 'row'*/}
      </div> 
    );
  }
}

export default AlbumButton;