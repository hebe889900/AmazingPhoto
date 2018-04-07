import './AlbumButton.css';
import React from 'react';

class AlbumButton extends React.Component {

  render() {
    // Photo is in PhotoPanel so PhotoCard only need to show it
    return (
      <div className="AlbumButton-container">
        <div className='row'>
          <div className='col s4 fill'>
            <Button>Sharks</Button>
          </div>
          <div className='col s4 fill'>
            <Button>Cats</Button>
          </div>          
        </div> {/* End of 'row'*/}
      </div> 
    );
  }
}

export default AlbumButton;