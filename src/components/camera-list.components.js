import React, { Component } from "react";
import CameraDataService from "../services/camera.service";
import { Link } from "react-router-dom";

export default class CameraList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveCameras = this.retrieveCameras.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCamera = this.setActiveCamera.bind(this);
    this.removeAllCameras = this.removeAllCameras.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      cameras: [],
      currentCamera: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveCameras();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveCameras() {
    CameraDataService.getAll()
      .then(response => {
        this.setState({
          cameras: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCameras();
    this.setState({
      currentCamera: null,
      currentIndex: -1
    });
  }

  setActiveCamera(camera, index) {
    this.setState({
      currentCamera: camera,
      currentIndex: index
    });
  }

  removeAllCameras() {
    CameraDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    CameraDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          cameras: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, cameras, currentCamera, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Cameras List</h4>

          <ul className="list-group">
            {cameras &&
              cameras.map((camera, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCamera(camera, index)}
                  key={index}
                >
                  {camera.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCameras}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCamera ? (
            <div>
              <h4>Camera</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCamera.name}
              </div>
              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {currentCamera.type}
              </div>
              <div>
                <label>
                  <strong>Latitude:</strong>
                </label>{" "}
                {currentCamera.lat}
              </div>
              <div>
                <label>
                  <strong>Longitude:</strong>
                </label>{" "}
                {currentCamera.lng}
              </div>
              <div>
                <label>
                  <strong>Azimuth:</strong>
                </label>{" "}
                {currentCamera.azimuth}
              </div>

              <Link
                to={"/cameras/" + currentCamera.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Camera...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}