import './PhotoPanel.css';
import React from 'react';
import _ from 'lodash';
import PhotoCard from '../PhotoCard/PhotoCard';
import { createStore } from 'redux';
import reducers from '../AlbumButton/Reducers';
import AlbumButton from '../AlbumButton/AlbumButton';
import { updateselected } from '../AlbumButton/Actions'


class PhotoPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Photo: null,
      Photolist: new Set()
    };
    this.loadMorePhoto = this.loadMorePhoto.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    console.log(props)
  }

  componentDidMount() {
  	    console.log("component did mount")
        // to retrieve from server only once every 1s
        console.log(this.props)
        this.props.store.subscribe(this.loadMorePhoto);
        this.loadMorePhoto();
  }

  onUpdate = (val) => {
    console.log(val)
    this.setState({
      Photolist: val
    })

    this.setState({Photolist: val}, function () {
        console.log(this.state.value);
        this.loadMorePhoto();
    });
    console.log(this.state)
    
  };


  // Load Photo from backend, currently only 2 sample Photo
  loadMorePhoto() {
    console.log (this.state.Photolist);
    console.log (this.state);
    let requestArray = [];
    // return a promise

    if (this.state.Photolist) {
      if (this.state.Photolist.has("Cats")) {
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
      if (this.state.Photolist.has("Sharks")) {
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

      const thisComponent = this;

      if(requestArray.length > 0) {
         Promise.all(requestArray).then(function(values){
          console.log(values)
          if(values[0]) {
            thisComponent.setState({
                Photo: thisComponent.state.Photo ? thisComponent.state.Photo.concat(values[0]) : values[0]
            });        
          }
          if(values[1]) {
             thisComponent.setState({
                Photo: thisComponent.state.Photo ? thisComponent.state.Photo.concat(values[1]) : values[1]
            });       
          }

          if(values[0] && values[1]) {
            thisComponent.setState({
                Photo: shuffle(thisComponent.state.Photo)
            });
          }
        });         
      }
      else {
        this.setState({
           Photo: null
        })
      }
      
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
        <div> 
          <AlbumButton action={this.onUpdate} />
          <div>{this.renderPhoto()} </div>
        </div>
      );
    }
    else {
      return (
        <div><AlbumButton action={this.onUpdate} /><div>Please select an album...</div> </div>
      );
    }
  }
}


let shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default PhotoPanel;