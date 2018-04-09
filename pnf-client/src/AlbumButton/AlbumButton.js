import './AlbumButton.css';
import Checkbox from './Checkbox';
import React from 'react';
import { createStore } from 'redux';
import reducers from './Reducers';
import { updateselected } from './Actions'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const store = createStore(reducers)
const items = [
    'Sharks',
    'Cats'
];
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

class AlbumButton extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      Photolist: ""
    }
  }


  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    console.log(this.selectedCheckboxes);
    this.props.action(this.selectedCheckboxes);
    store.dispatch(updateselected(this.selectedCheckboxes))
    console.log(store.getState());
    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }    
  }


  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  )

  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )

  render() {
    return (
      <div className="container">
        <div className="row">
            <form>
              {this.createCheckboxes()}
            </form>
        </div>
      </div>
    );
  }
}

export default AlbumButton;