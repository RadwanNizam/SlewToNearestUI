import React, { Component } from "react";
import CameraDataService from "../services/camera.service";
import NumericInput from 'react-numeric-input';

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeLng = this.onChangeLng.bind(this);
    this.onChangeLat = this.onChangeLat.bind(this);
    this.onChangeAzimuth = this.onChangeAzimuth.bind(this);
    this.updateCamera = this.updateCamera.bind(this);
    this.deleteCamera = this.deleteCamera.bind(this);

    this.state = {
      currentCamrea: {
        id: null,
        name: "",
        type: "", 
        lng: 0.0,
        lat: 0.0,
        azimuth: 0.0  
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCamera(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCamera: {
          ...prevState.currentCamera,
          name: name
        }
      };
    });
  }

  onChangeType(e) {
    const type = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCamera: {
          ...prevState.currentCamera,
          type: type
        }
      };
    });
  }

  onChangeLat(e) {
    const lat = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCamera: {
          ...prevState.currentCamera,
          lat: lat
        }
      };
    });
  }

  onChangeLng(e) {
    const lng = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCamera: {
          ...prevState.currentCamera,
          lng: lng
        }
      };
    });
  }

  onChangeAzimuth(e) {
    const azimuth = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCamera: {
          ...prevState.currentCamera,
          azimuth: azimuth
        }
      };
    });
  }


  getCamera(id) {
    CameraDataService.get(id)
      .then(response => {
        this.setState({
          currentCamera: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

   updateCamera() {
    CameraDataService.update(
      this.state.currentCamera.id,
      this.state.currentCamera
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The camera was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCamera() {    
    CameraDataService.delete(this.state.currentCamera.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cameras')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCamera } = this.state;

    return (
      <div>
        {currentCamera ? (
          <div className="edit-form">
            <h4>Camera</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCamera.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select value={this.state.type} onChange={this.onChangeType} className="form-control" id="type">
                  <option value="Front">Front</option>
                  <option value="Back">Back</option>
                  <option value="EO">EO</option>
                  <option value="IR">IR</option>
                  <option value="Cam360">360</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="lat">Latitude</label>
                
                <NumericInput 
                  className="form-control"
                  id="lat"
                  style={ false }
                  min = {-90} max={90}
                  value={currentCamera.lat}
                  onChange={this.props.onChangeLat}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lng">Longitude</label>
                <NumericInput 
                  className="form-control"
                  style={ false }
                  min = {-180} max={180}
                  id="lng"
                  value={currentCamera.lng}
                  onChange={this.props.onChangeLng}
                />
              </div>
              <div className="form-group">
                <label htmlFor="azimuth">Azimuth</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentCamera.azimuth}
                  onChange={this.onChangeAzimuth}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCamera}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateCamera}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Camera...</p>
          </div>
        )}
      </div>
    );
  }
}