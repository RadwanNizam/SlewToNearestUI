import React, { Component } from "react";
import CameraDataService from "../services/camera.service";

export default class AddCamera extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeLng = this.onChangeLng.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this);
    this.onChangeAzimuth = this.onChangeAzimuth.bind(this);
    this.saveCamera = this.saveCamera.bind(this);
    this.newCamera = this.newCamera.bind(this);

    this.state = {
      id: null,
      name: "",
      type: "FRONT", 
      lng: 0.0,
      lat: 0.0,
      azimuth: 0.0,  
      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeLng(e) {
    this.setState({
      lng: e.target.value
    });
  }

  onChangeLat(e) {
    this.setState({
      lat: e.target.value
    });
  }

  onChangeAzimuth(e) {
    this.setState({
      azimuth: e.target.value
    });
  }

  saveCamera() {
    var data = {
      name: this.state.name,
      type: this.state.type,
      lng: this.state.lng,
      lat: this.state.lat,
      azimuth: this.state.azimuth
    };

    this.setState({submitted:true});
    CameraDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          type: response.data.type,
          lng: response.data.lgn,
          lat: response.data.lat,
          azimuth: response.data.azimuth,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newCamera() {
    this.setState({
      id: null,
      name: "",
      type: "FRONT",
      lng: 0.0,
      lat: 0.0,
      azimuth: 0.0,  
      submitted: false
    });
  }

  render() {
    return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newCamera}>
                Add
              </button>
            </div>
          ) : (            
            <div>
              <div className="form-group"><h1>Add New Camera</h1></div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.name}
                  onChange={this.onChangeName}
                  name="name"
                  required
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select value={this.state.type} onChange={this.onChangeType} className="form-control" id="type" name="type" required>
                  <option value="FRONT">Front</option>
                  <option value="BACK">Back</option>
                  <option value="EO">EO</option>
                  <option value="IR">IR</option>
                  <option value="TYPE_360">360</option>
                </select>
              </div>
  
              <div className="form-group">
                <label htmlFor="lat">Latitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="lat"
                  required
                  value={this.state.lat}
                  onChange={this.onChangeLat}
                  name="lat"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lng">Longitude</label>
                <input
                  type="text"
                  className="form-control"
                  id="lng"
                  required
                  value={this.state.lng}
                  onChange={this.onChangeLng}
                  name="lng"
                />
              </div>

              <div className="form-group">
                <label htmlFor="azimuth">Azimuth</label>
                <input
                  type="text"
                  className="form-control"
                  id="azimuth"
                  required
                  value={this.state.azimuth}
                  onChange={this.onChangeAzimuth}
                  name="azimuth"
                />
              </div>

              <button onClick={this.saveCamera} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
  }
}