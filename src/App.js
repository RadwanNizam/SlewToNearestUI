import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

 import AddCamera from "./components/camera-add.component";
 import CameraList from "./components/camera-list.components";
 import Camera from "./components/camera.component";
 import MapScreen from "./components/map.component";
 import AddPoint from "./components/point-add.component";

class App extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      points: []
    };

    this.handleAddPoint = this.handleAddPoint.bind(this);
  }

  handleAddPoint(newPoint){
    this.setState(state => {
      const points = [...state.points, newPoint];
 
      return {
        points
      };
    });
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/tutorials" className="navbar-brand">
              Camera Control System
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add New Camera
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cameras"} className="nav-link">
                  All Cameras
                </Link>
              </li>              
              <li className="nav-item">
                <Link to={"/point"} className="nav-link">
                  Add Target Points
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/map"} className="nav-link">
                  View on Map
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/cameras"]} component={CameraList} />
              <Route exact path="/add" component={AddCamera} />
              <Route path="/cameras/:id" component={Camera} />
              <Route path="/map" component={() => <MapScreen targetPoints={this.state.points}/>} />
              <Route path="/point" component={() => <AddPoint handleAddPoint={this.handleAddPoint}/>} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;