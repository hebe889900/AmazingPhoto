import './PhotoCard.css';
import React from 'react';

class PhotoCard extends React.Component {
  redirectToUrl(url) {
    window.open(url, '_blank');
  }

  render() {
    // Photo is in PhotoPanel so PhotoCard only need to show it
    return (
      <div className="Photo-container"
           onClick={() => this.redirectToUrl(this.props.Photo.url)}>
        <div className='row'>
          <div className='col s4 fill'>
            <img src={this.props.Photo.urlToImage} alt='Photo'/>
          </div>
          <div className="col s8">
            <div className="Photo-intro-col">
              <div className="Photo-intro-panel">
                <h4>{this.props.Photo.title}</h4>
                <div className="Photo-description">
                  <p>{this.props.Photo.description}</p>
                  <div>
                    {
                      this.props.Photo.source != null &&
                      <div className='chip light-blue Photo-chip'>
                        {this.props.Photo.source}
                      </div>
                    }
                    {
                      this.props.Photo.reason != null &&
                      <div className='chip light-green Photo-chip'>
                        {this.props.Photo.reason}
                      </div>
                    }
                    {
                      this.props.Photo.time != null &&
                      <div className='chip amber Photo-chip'>
                        {this.props.Photo.time}
                      </div>
                    }
                  </div>
                </div> {/* End of Photo-description */}
              </div> {/* End of 'Photo-intro-panel'*/}
            </div> {/* End of 'Photo-intro-col'*/}
          </div> {/* End of 'col s8'*/}
        </div> {/* End of 'row'*/}
      </div> 
    );
  }
}

export default PhotoCard;