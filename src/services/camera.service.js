import http from "../http-common";

class CameraDataService {
  getAll() {
    return http.get("/camera");
  }

  get(id) {
    return http.get(`/camera/${id}`);
  }

  create(data) {
    return http.post("/camera", data);
  }

  update(id, data) {
    return http.put(`/camera`, data);
  }

  delete(id) {
    return http.delete(`/camera/${id}`);
  }

  deleteAll() {
    return http.delete(`/camera`);
  }

}

export default new CameraDataService();