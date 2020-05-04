import http from "../http-common";

class GeoService {
  slewToNearest(data) {
    return http.post("/geo/nearest",data);    }
}

export default new GeoService();