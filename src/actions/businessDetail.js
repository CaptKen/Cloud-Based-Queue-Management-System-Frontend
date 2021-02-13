import {
    BUSINESS_DETAIL
  } from "./types";

import BusinessDetail from "../services/business.service";

export const businessDetail = (businessName, branch) => (dispatch) => {
    return BusinessDetail.getBusinessDetail(businessName, branch).then(
      (response) => {
        dispatch({
          type: BUSINESS_DETAIL,
          payload: response.data.BusinessDetail,
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