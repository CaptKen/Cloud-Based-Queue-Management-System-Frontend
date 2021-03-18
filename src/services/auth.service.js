import axios from "axios";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  loginAdmin(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        console.log(response.data.roles);
        if (response.data.accessToken) {
          if (response.data.roles[0] === "ROLE_ADMIN") {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        }

        return response.data;
      });
  }

  loginManager(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        console.log(response.data.roles);
        if (response.data.accessToken) {
          if (response.data.roles[0] === "ROLE_MANAGER") {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, telephone) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      telephone,
    });
  }

  registerManager(username, email, password, businessName, branch, category, lat, lng) {
    return axios.post(API_URL + "signupManager", {
      username,
      email,
      password,
      businessName,
      branch,
      category,
      lat,
      lng
    }, { headers: authHeader() });
  }

  updateProfile(username, userProfile) {
    return axios.patch(API_URL + 'updateProfile/' + username, userProfile)
  }

  getProfile(username) {
    return axios.get(API_URL + 'profile/' + username)
  }

  changePassword(username, password) {
    return axios.patch(API_URL + 'changePassword/' + username, password)
  }

  loginEmployee(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        console.log(response.data.roles);
        if (response.data.accessToken) {
          if (response.data.roles[0] === "ROLE_EMPLOYEE") {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        }

        return response.data;
      });
  }

  registerEmployee(username, email, password, telephone, businessName, branch) {
    return axios.post(API_URL + "signupEmployee", {
      username,
      email,
      password,
      telephone,
      businessName,
      branch
    }, { headers: authHeader() });
  }


  listEmployee(businessName, branch) {
    console.log("testURL________________________________" + API_URL + 'findEmployeeByBusiness/' + '?businessName=' + 'burinLKB' + "&branch=" + 'LKB');
    return axios.get(API_URL + 'findEmployeeByBusiness/' + '?businessName=' + businessName + "&branch=" + branch)

  }

  deleteUser(id) {
    return axios.get(API_URL + 'delete/' + id)
  }



}







export default new AuthService();