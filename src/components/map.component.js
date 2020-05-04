import React, { Component } from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import L, { Tooltip, Polyline } from 'leaflet';
import CameraDataService from "../services/camera.service";
import GeoService from "../services/geo.service";

export default class MapScreen extends Component {
  constructor() {
    super();
    this.state = {
      bearingInfo : null,
      lat: 0,
      lng: 0,
      zoom: 50,
    };
  }

  componentDidMount() {
    this.retrieveCameras();
  }

  retrieveCameras() {
    CameraDataService.getAll()
      .then(response => {
        this.setState({
          lat: response.data[0].lat,
          lng: response.data[0].lng          
        });


        this.slowToNearest(); 

        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  slowToNearest() {
    var targetPoints = this.props.targetPoints;
    var data = {
      cameraPoint :{
        lng: this.state.lng,
        lat: this.state.lat
      }, targetPoints :targetPoints
    };
   


    GeoService.slewToNearest(data)
      .then(response => {
        this.setState({
          bearingInfo: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    
    const targetPointIcon = L.icon({
      iconUrl: require('../icons/target_point.png'),
      iconSize: [64,64],
      popupAnchor: null,
      shadowUrl: null,
      shadowSize: null,
      shadowAnchor: null
  });
    
  const nearestPointIcon = L.icon({
    iconUrl: require('../icons/nearest_point.png'),
    iconSize: [100,64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
});

const cameraIcon = L.icon({
  iconUrl: require('../icons/camera.png'),
  iconSize: [50,50],
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
});

  let label;
  if (this.state.bearingInfo != null){ 
    label = <label>Camera ({this.state.bearingInfo.from.lat},{this.state.bearingInfo.from.lng})<br></br>
    Nearest Point ({this.state.bearingInfo.to.lat},{this.state.bearingInfo.to.lng})<br></br>
    Bearing Degree : {this.state.bearingInfo.bearingDegree}
    </label>;
  }else{
    label = <label/>
  }

  
    return (

      <div className="form-group">
        {label}
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
          <Marker  key={`marker-0`} position={position} icon={cameraIcon}>          
        </Marker>          

        {this.props.targetPoints.map((position, idx) =>   
          <Marker key={`marker-{idx}`} position={[position.lat, position.lng]} icon={this.state.bearingInfo != null && position.lat === this.state.bearingInfo.to.lat && position.lng === this.state.bearingInfo.to.lng ? nearestPointIcon:targetPointIcon}>
          <Popup>
        <span>latitude/longitude: {position.lat}/{position.lng}</span>
          </Popup>        
        </Marker>          
        )}
       
      </Map>    </div>
    );
  }
}