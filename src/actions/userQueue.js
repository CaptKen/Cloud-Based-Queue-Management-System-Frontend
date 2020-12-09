import {
    SET_MESSAGE,
    ADD_QUEUE_SUCCESS,
    VIEW_QUEUE
  } from "./types";

import UserService from "../services/user.service";

export const addqueue = (formData) => (dispatch) => {
    return UserService.postQueueNotLogin(formData).then(
      (response) => {
        dispatch({
          type: ADD_QUEUE_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          
        return Promise.reject();
      }
    );
  };

  export const queueDetail = (username, businessName) => (dispatch) => {
    return UserService.getQueueDetail(username, businessName).then(
      (response) => {
        dispatch({
          type: VIEW_QUEUE,
          payload: response.data.queueDetail,
        });
  
        return Promise.resolve();
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          
        return Promise.reject();
      }
    );
  };