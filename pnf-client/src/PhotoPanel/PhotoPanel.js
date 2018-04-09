import './PhotoPanel.css';
import React from 'react';
import _ from 'lodash';
import PhotoCard from '../PhotoCard/PhotoCard';
import { createStore } from 'redux';
import reducers from '../AlbumButton/Reducers';
import AlbumButton from '../AlbumButton/AlbumButton';
import { updateselected } from '../AlbumButton/actions'


class PhotoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Photo: null,
      Photolist: props.store.getState()
    };
    this.loadMorePhoto = this.loadMorePhoto.bind(this);
  }

  componentDidMount() {
  	    console.log("component did mount")
        // to retrieve from server only once every 1s
        console.log(this.props)
        this.props.store.subscribe(this.loadMorePhoto);
        this.loadMorePhoto();
  }

  // Load Photo from backend, currently only 2 sample Photo
  loadMorePhoto() {
    console.log (this.props.store.getState());
    this.setState({
      Photolist: this.props.store.getState()
    });    
    let requestArray = [];
    // return a promise
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

    if (this.props.store.getState()) {
      if (this.props.store.getState().has("Cats")) {
          let catsRequest = new Request('/catslist', {
            method: 'GET',
            cache: "no-cache" // make sure f5 is a real f5
          });    

         let catFetch = fetch(catsRequest)
          .then((res) =>  res.json()) // transfer to JSON
          .then((loadedPhoto) => {
            // the previous Photo is empty, then use 'loadedPhoto'
            // or we need to add 'loadedPhoto' after previous Photo
            console.log(loadedPhoto)
            return loadedPhoto;
          });     
          requestArray.push(catFetch);
      }


      //Fetch sharklist
      if (this.props.store.getState.has("Sharks")) {
          let sharksRequest = new Request('/sharkslist', {
            method: 'GET',
            cache: "no-cache" // make sure f5 is a real f5
          });         
         let sharkFetch = fetch(sharksRequest)
          .then((res) =>  res.json()) // transfer to JSON
          .then((loadedPhoto) => {
            // the previous Photo is empty, then use 'loadedPhoto'
            // or we need to add 'loadedPhoto' after previous Photo
            console.log(loadedPhoto)
            return loadedPhoto;
          });  
          requestArray.push(sharkFetch);
      }

      Promise.all(requestArray).then(function(values){
        if(values[0]) {
          this.setState({
              Photo: this.state.Photo ? this.state.Photo.concat(values[0]) : values[0]
          });        
        }
        if(values[1]) {
           this.setState({
              Photo: this.state.Photo ? this.state.Photo.concat(values[1]) : values[1]
          });       
        }
      });        
    }
  

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