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

  registerManager(username, email, password, businessName, branch) {
    return axios.post(API_URL + "signupManager", {
      username,
      email,
      password,
      businessName,
      branch
    }, { headers: authHeader() });
  }
}

export default new AuthService();