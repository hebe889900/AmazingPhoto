import './PhotoPanel.css';
import React from 'react';
import _ from 'lodash';
import PhotoCard from '../PhotoCard/PhotoCard';

class PhotoPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      Photo: null
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
  	console.log("component did mount")
    this.loadMorePhoto();
        // to retrieve from server only once every 1s
    this.loadMorePhoto = _.debounce(this.loadMorePhoto, 1000);
    window.addEventListener('scroll', this.handleScroll);
  }

  // Load Photo from backend, currently only 2 sample Photo
  loadMorePhoto() {
    let request = new Request('/news', {
      method: 'GET',
      cache: "no-cache" // make sure f5 is a real f5
    });

    // return a promise
    fetch(request)
      .then((res) =>  res.json()) // transfer to JSON
      .then((loadedPhoto) => {
        // the previous Photo is empty, then use 'loadedPhoto'
        // or we need to add 'loadedPhoto' after previous Photo
        this.setState({
          Photo: this.state.Photo ? this.state.Photo.concat(loadedPhoto) : loadedPhoto
        });
      });
  }

    handleScroll() {
    // window.scrollY : current page that scrolls to (pixel in Y)
    // window.pageYOffset is the old version of window.scrollY
    // document.documentElement.scrollTop - for IE
    let scrollY = window.scrollY ||
                  window.pageYOffset ||
                  document.documentElement.scrollTop;
    // window.innerHeight is the visual window height
    // window.innerHeight + scrollY  - the height of the whole page
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50)) {
      console.log('App.js : Loading more Photo...');
      this.loadMorePhoto();
    }
  }


  // Iterate each Photo in state.Photo and create PhotoCard for it
  renderPhoto() {
    const Photo_list = this.state.Photo.map(function(Photo) {
      return (
        <a className="list-group-item" key={Photo.digest} href='#'>
          <PhotoCard Photo={Photo} />
        </a>
      );
    });

    return (
      <div className="container-fluid">
        <a className="list-group-item" href='#'>
          {Photo_list}
        </a>
      </div>
    )
  }

  render() {
    console.log(this.state.Photo);
    if (this.state.Photo) {
      return (
        <div> '{this.renderPhoto()}' </div>
      );
    }
    else {
      return (
        <div> Loading... </div>
      );
    }
  }
}

export default PhotoPanel;