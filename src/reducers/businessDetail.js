import {
  BUSINESS_DETAIL
} from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BUSINESS_DETAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
}