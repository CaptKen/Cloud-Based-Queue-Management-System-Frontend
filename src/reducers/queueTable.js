import {
    FETCH_QUEUE_UPDATETING,
    FETCH_QUEUE_UPDATETING_SUCCESS,

  } from "../actions/types";
  
  const initialState = {
    isFetching: false,
    queueData: {},
  }
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case 'FETCH_QUEUE_UPDATETING':
        return {
          ...state,
          isFetching: true
        }
      case 'FETCH_QUEUE_UPDATETING_SUCCESS':
        return {
          ...state,
          isFetching: false,
          queueData: payload
        }
      default:
        return state
    }
  }