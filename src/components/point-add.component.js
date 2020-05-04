import React, { Component } from "react";
import NumericInput from 'react-numeric-input';

export default class AddPoint extends Component {
  constructor(props) {
    super(props);
    this.onChangeLng = this.onChangeLng.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this);
    this.savePoint = this.savePoint.bind(this);
    this.newPoint = this.newPoint.bind(this);

    this.state = {
      lng: 0.0,
      lat: 0.0,
      submitted: false
    };
  }

  onChangeLng(e) {
    this.setState({
      lng: e
    });
  }

  onChangeLat(e) {
    this.setState({
      lat: e
    });
  }

  savePoint() {    
    var data = {
      lng: this.state.lng,
      lat: this.state.lat
    };

    this.props.handleAddPoint(data);
    this.setState({submitted:true});    
    }

  newPoint() {
    this.setState({
      lng: 0.0,
      lat: 0.0,
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You added successfully!</h4>
              <button className="btn btn-success" onClick={this.newPoint}>
                Add
              </button>
            </div>
          ) : (            
            <div>
              <div className="form-group"><h1>Add New Point</h1></div>
  
              <div className="form-group">
                <label htmlFor="lat">Latitude</label>
                <NumericInput 
                  className="form-control"
                  id="lat"
                  style={ false }
                  min = {-90} max={90}
                  value={this.state.lat}
                  onChange={this.onChangeLat}
                  name="lat"                  
                />                
              </div>

              <div className="form-group">
                <label htmlFor="lng">Longitude</label>
                <NumericInput 
                  className="form-control"
                  id="lng"
                  style={ false }
                  min = {-180} max={180}
                  value={this.state.lng}
                  onChange={this.onChangeLng}
                  name="lng"                  
                /> 
              </div>

              <button onClick={this.savePoint} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}