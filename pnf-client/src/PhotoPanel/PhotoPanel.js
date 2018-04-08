import './PhotoPanel.css';
import React from 'react';
import _ from 'lodash';
import PhotoCard from '../PhotoCard/PhotoCard';
import { createStore } from 'redux';
import reducers from '../AlbumButton/Reducers';
import { updateselected } from '../AlbumButton/actions'


const store = createStore(reducers);


class PhotoPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      Photo: null
    };
  }

  componentDidMount() {
  	console.log("component did mount")
    //const unsubscribe = store.subscribe(this.loadMorePhoto())
    //unsubscribe();
    this.loadMorePhoto()
    console.log(this.loadMorePhoto)
        // to retrieve from server only once every 1s
    this.loadMorePhoto = _.debounce(this.loadMorePhoto, 1000);
  }

  // Load Photo from backend, currently only 2 sample Photo
  loadMorePhoto() {
    console.log (store.getState());
    let request = new Request('/catslist', {
      method: 'GET',
      cache: "no-cache" // make sure f5 is a real f5
    });

    // return a promise
    fetch(request)
      .then((res) =>  res.json()) // transfer to JSON
      .then((loadedPhoto) => {
        // the previous Photo is empty, then use 'loadedPhoto'
        // or we need to add 'loadedPhoto' after previous Photo
        console.log(loadedPhoto)
        this.setState({
          Photo: this.state.Photo ? this.state.Photo.concat(loadedPhoto) : loadedPhoto
        });
      });
  }



  // Iterate each Photo in state.Photo and create PhotoCard for it
  renderPhoto() {
    const images = this.state.Photo.map(Photo => ({
        original: Photo,
        thumbnail: Photo
    }));
    return (
      <div className="container-fluid">
            <PhotoCard items={images} />
      </div>
    )
  }

  render() {
    console.log(this.state.Photo);
    if (this.state.Photo) {
      return (
        <div> {this.renderPhoto()} </div>
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