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

  postQueueNotLogin(formDate) {
    return axios.post(QUEUE_URL_API + 'addQueue', formDate);
  }

  // //ลูกค้าดูรายละเอียดคิวของตัวเอง หน้า currentQueue
  // getQueueDetail(username, businessName){
  //   return axios.get(QUEUE_URL_API + 'detail', { headers: authHeader() , username, businessName})
  // }

  //ลูกค้าดูรายละเอียดคิวของตัวเอง หน้า currentQueue
  getQueueDetail(businessName, username) {
    return axios.get(QUEUE_URL_API + 'queueStatusDetail?business_name=' + businessName + "&username=" + username)
  }

  //cancel คิว
  cancelQueue(username, queueDetail) {
    return axios.patch(QUEUE_URL_API + 'cancelQueue/' + username, queueDetail);
  }

  listQueue(username) {
    return axios.get(QUEUE_URL_API + 'checkQueueWithLoginUsername?username=' + username);
  }

  allQueue(business_name, username) {
    return axios.get(QUEUE_URL_API + 'findWatingQueueByBusiness?business_name=' + business_name + "&username=" + username)
  }

  allQueueOfBusiness(business_name) {
    return axios.get(QUEUE_URL_API + 'queueByBusiness?business_name=' + business_name)
  }

  currentQueueDetail(business_name) {
    return axios.get(QUEUE_URL_API + 'findCurrentQueueDetail?business_name=' + business_name)
  }
}

export default new UserService();