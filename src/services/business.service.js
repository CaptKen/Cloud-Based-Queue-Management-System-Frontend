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
  getBusinessDetail(businessName, branch) {
    return axios.get(BUSINESS_URL_API + 'findBusinessDetail?name=' + businessName + "&branch=" + branch)
  }

  //upload รูป
  upLoadPromotionImg(file, onUploadProgress, businessName) {
    let formData = new FormData();

    formData.append("file", file);
    return axios.post(BUSINESS_URL_API + 'addPromo/' + businessName, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }, onUploadProgress
    });
  }

  //เอารูป Promotion
  getPromotionImg(businessName) {
    return axios.get(BUSINESS_URL_API + businessName + '/' + "files");
  }

  //update fields
  updateFields(businessName, branch, fieldsList) {
    return axios.patch(BUSINESS_URL_API + 'updateFields/' + businessName + '/' + branch, fieldsList)
  }

  //update fields
  updateTableDetail(businessName, branch, tableDetail) {
    return axios.patch(BUSINESS_URL_API + 'updateTableDetail/' + businessName + '/' + branch, tableDetail)
  }

  //update businessDetail
  updateBusinessDetailList(businessName, branch, businessDetail) {
    return axios.patch(BUSINESS_URL_API + 'updatebusinessDetail/' + businessName + '/' + branch, businessDetail)
  }

  //update constraint
  updateConstraint(businessName, branch, constraint) {
    return axios.patch(BUSINESS_URL_API + 'updateConstraint/' + businessName + '/' + branch, constraint)
  }

  //delete promotion
  deletePromoImg(businessName, fileName) {
    return axios.delete(BUSINESS_URL_API + 'deletePromoImg/' + businessName + '/' + fileName);
  }

  //listCatagories
  listCatagories(){
    return axios.get(BUSINESS_URL_API + 'listCatagories')
  }

  //list By Category Name
  findByCategoryName(categoryName){
    return axios.get(BUSINESS_URL_API + 'findByCategoryName?categoryNmae=' + categoryName)
  }

  //upload รูป Icon
  upLoadIconImg(file, onUploadProgress, businessName) {
    let formData = new FormData();

    formData.append("file", file);
    return axios.post(BUSINESS_URL_API + 'addIcon/' + businessName, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }, onUploadProgress
    });
  }

  //เอารูป Icon
  getIconImg(businessName) {
    return axios.get(BUSINESS_URL_API + businessName + '/' + "icons");
  }

  //delete Icon
  deleteIconImg(businessName, fileName) {
    return axios.delete(BUSINESS_URL_API + 'deleteIconImg/' + businessName);
  }

  //get findQuantityDetail
  findQuantityDetail(businessName){
    return axios.get(BUSINESS_URL_API + 'findQuantityDetail?business_name=' + businessName)
  }

}

export default new BusinessService();