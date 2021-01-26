import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';
const BUSINESS_URL_API = 'http://localhost:8080/api/business/';

class BusinessService {
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

  //ลูกค้าดูรายละเอียดคิวของตัวเอง หน้า currentQueue
  getBusinessDetail(businessName, branch){
    return axios.get(BUSINESS_URL_API + 'findBusinessDetail?name=' + businessName +"&branch=" + branch)
  }

  //upload รูป
  upLoadPromotionImg(file, onUploadProgress){
    let formData = new FormData();

    formData.append("file", file);
    return axios.post(BUSINESS_URL_API + 'addPromo', formData, {
      headers:{
      "Content-Type": "multipart/form-data",
    },onUploadProgress
  });
  }

  //เอารูป
  getPromotionImg(){
    return axios.get(BUSINESS_URL_API+ "files");
  }


}

export default new BusinessService();