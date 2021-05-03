import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import userQueue from "./userQueue"

export default combineReducers({
  auth,
  message,
  userQueue,
});