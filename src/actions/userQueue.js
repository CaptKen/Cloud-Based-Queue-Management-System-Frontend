import {
    SET_MESSAGE,
    ADD_QUEUE_SUCCESS,
    VIEW_QUEUE,
    ADD_QUEUE_FAIL,
    CANCEL_QUEUE_SUCCESS,
    LIST_USER_QUEUE
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
        
          dispatch({
            type: ADD_QUEUE_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          
        return Promise.reject();
      }
    );
  };

  export const queueDetail = (username, businessName, email) => (dispatch) => {
    return UserService.getQueueDetail(username, businessName, email).then(
      (response) => {
        dispatch({
          type: LIST_USER_QUEUE,
          payload: response.data.listQueue,
        });
  
        return Promise.resolve();
      },
      (error) => {
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
          
        return Promise.reject();
      }
    );
  };

  export const listQueue = (username) => (dispatch) => {
    return UserService.getQueueDetail(username).then(
      (response) => {
        dispatch({
          type: VIEW_QUEUE,
          payload: response.data.queueDetail,
        });
  
        return Promise.resolve();
      },
      (error) => {
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
          
        return Promise.reject();
      }
    );
  };

  export const cancelQueue = (queueDetail) => (dispatch) => {
    return UserService.cancelQueue(queueDetail).then(
      (response) => {
        dispatch({
          type: CANCEL_QUEUE_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve();
      },
      (error) => {
        // const message =
        //   (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        //   error.message ||
        //   error.toString();
          
        return Promise.reject();
      }
    );
  };

  export const addQueueWithDynamicFields = (formData) => (dispatch) => {
    return UserService.addQueueWithDynamicFields(formData).then(
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
        
          dispatch({
            type: ADD_QUEUE_FAIL,
          });
    
          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });
          
        return Promise.reject();
      }
    );
  };