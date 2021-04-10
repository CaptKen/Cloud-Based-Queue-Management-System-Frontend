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
  getQueueDetail(businessName, username, email) {
    return axios.get(QUEUE_URL_API + 'queueStatusDetail?business_name=' + businessName + "&username=" + username + "&email=" + email)
  }

  //cancel คิว
  cancelQueue(username, queueDetail) {
    return axios.patch(QUEUE_URL_API + 'cancelQueue/' + username, queueDetail);
  }

  listQueue(username, email) {
    return axios.get(QUEUE_URL_API + 'checkQueueWithLoginUsername?username=' + username + "&email=" + email);
  }

  listQueueByEmail(username, email) {
    return axios.get(QUEUE_URL_API + 'checkQueueWithLoginEmail?username=' + username + "&email=" + email);
  }

  allQueue(business_name, username, email) {
    return axios.get(QUEUE_URL_API + 'findWatingQueueByBusiness?business_name=' + business_name + "&username=" + username + "&email=" + email)
  }

  allQueueOfBusiness(business_name) {
    return axios.get(QUEUE_URL_API + 'queueByBusiness?business_name=' + business_name)
  }

  currentQueueDetail(business_name) {
    return axios.get(QUEUE_URL_API + 'findCurrentQueueDetail?business_name=' + business_name)
  }

  addQueueWithDynamicFields(formDate) {
    return axios.post(QUEUE_URL_API + 'addQueueWithDynamicFields', formDate);
  }

  //เวลาที่มีคนจองแล้ว
  listBookedTimeQueue(business_name) {
    return axios.get(QUEUE_URL_API + 'listBookedTimeQueue?business_name=' + business_name)
  }

  //แก้ไขเวลาที่จอง
  editQueueDetail(formDate, username) {
    return axios.put(QUEUE_URL_API + 'updateQueueDetail/' + username, formDate)
  }

  //รับ current คิว
  acceptCurrentQueue(username, queueDetail) {
    return axios.patch(QUEUE_URL_API + 'acceptCurrentQueue/' + username, queueDetail);
  }

  // ข้ามคิวปัจจุบัน
  skipCurrentQueue(username, queueDetail) {
    return axios.patch(QUEUE_URL_API + 'skipQueue/' + username, queueDetail);
  }

  // ต่อเวลา
  addTimeQueue(username, queueDetail) {
    return axios.patch(QUEUE_URL_API + 'addTimeQueue/' + username, queueDetail);
  }

  // ส่งโต๊ะ
  getServiceNo(username, service_no, queueDetail) {
    return axios.patch(QUEUE_URL_API + 'getServiceNo/' + username + '/' + service_no, queueDetail);
  }

}

export default new UserService();