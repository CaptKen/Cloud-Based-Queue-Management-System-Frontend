import { 
    SET_MESSAGE,
    ADD_QUEUE_SUCCESS,
    VIEW_QUEUE,
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_QUEUE_SUCCESS:
        return {
          ...state,
        };
    
        case VIEW_QUEUE:
        return {
            queueDetail: payload
        };

    default:
      return state;
  }
}