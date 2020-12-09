import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const QUEUE_URL_API = 'http://localhost:8080/api/queue/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  postQueueNotLogin(formDate){
    return axios.post(QUEUE_URL_API + 'addQueue', { headers: authHeader() }, formDate);
  }

  //ลูกค้าดูรายละเอียดคิวของตัวเอง หน้า currentQueue
  getQueueDetail(username, businessName){
    return axios.get(QUEUE_URL_API + 'detail', { headers: authHeader() , username, businessName})
  }
}

export default new UserService();