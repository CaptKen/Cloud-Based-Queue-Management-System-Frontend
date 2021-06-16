import {
  ADD_QUEUE_SUCCESS,
  VIEW_QUEUE,
  ADD_QUEUE_FAIL,
  CANCEL_QUEUE_SUCCESS,
  LIST_USER_QUEUE,
  GET_INPROCESS_QUEUE,
  GET_WAITING_QUEUE,
  GET_INPROCES_AND_DONE_QUEUE,
  GET_ALL_QUEUE_FOR_SHOWQUEUE_PAGE
} from "../actions/types";

const initialState = {
  previousQueue: undefined,
  waitingQueue: undefined,
  inprocessAndDoneQueue: undefined
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_QUEUE_SUCCESS:
      return {
        ...state,
      };

    case ADD_QUEUE_FAIL:
      return {
        ...state,
      };

    case VIEW_QUEUE:
      return {
        ...state,
        queueDetail: payload
      };

    case CANCEL_QUEUE_SUCCESS:
      return {
        ...state
      };

    case LIST_USER_QUEUE:
      return {
        ...state
      };

    case GET_INPROCESS_QUEUE:
      return {
        ...state,
        previousQueue: payload
      };

    case GET_WAITING_QUEUE:
      return {
        ...state,
        waitingQueue: payload
      };

      case GET_INPROCES_AND_DONE_QUEUE:
      return {
        ...state,
        inprocessAndDoneQueue: payload
      };

      case GET_ALL_QUEUE_FOR_SHOWQUEUE_PAGE:
        console.log("GET_ALL_QUEUE_FOR_SHOWQUEUE_PAGE : ", payload);
      return {
        ...state,
        previousQueue: payload.inprocessQueue[0],
        waitingQueue: payload.waitingQueue,
        inprocessAndDoneQueue: payload.inprocessAndDoneQueue,
      };
    
    default:
      return state;
  }
}