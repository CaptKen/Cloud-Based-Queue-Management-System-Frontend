import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import UserService from "../services/user.service";
import { Button } from "react-bootstrap";
import businessService from '../services/business.service';
import { render } from "react-dom";
import { connect } from "react-redux";
import AuthService from "../services/auth.service";

class ListEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      apiResponse: [],
      listEmployees: [],
      branch: '',
      businessName: this.props.businessName,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      rows: [{}],
      editMode: {
        status: false,
        rowKey: null
      }
    };
  }

  componentDidMount = () => {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        branch: user.branch,
        businessName: user.businessName,
      });
      businessService.getBusinessDetail(user.businessName, user.branch).then(
        res => {
          console.log("apiResponse: " + res.data.BusinessDetail[0].fields);
          this.setState({
            apiResponse: res.data.BusinessDetail[0].fields,
          })
        }
      )

      AuthService.listEmployee(user.businessName, user.branch).then(
        response => {
          console.log("response.data.listEmployee");
          console.log(response.data);
          console.log("1111"+user.businessName);
          console.log("1111"+user.branch);
          this.setState({
            listEmployees: response.data,
          });

        },
        error => {
          this.setState({
            listEmployees:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      )


    }

    console.log("row: ", this.state.rows)
    console.log("apiResponse data: ", this.state.apiResponse);
  }

  handleEdit = (i) => () => {
    console.log(i)
    this.setState({
      editMode: {
        status: true,
        rowKey: i
      }
    });
  };
  handleAddRow = () => {
    console.log("add")
    const fieldName = "";
    this.setState({
      apiResponse: [...this.state.apiResponse, fieldName],
      editMode: {
        status: true,
        rowKey: this.state.apiResponse.length
      }
    });
  };

  handleRemoveSpecificRow = (i) => () => {
    const apiResponse = [...this.state.apiResponse];
    apiResponse.splice(i, 1);
    this.setState({ apiResponse });
  };



  handleSave = () => {
    console.log("save");
    this.handleUpdateField();
    this.setState({
      editMode: {
        status: false,
        rowKey: null
      }
    });
  };

  handleDelete = (i) => {
    AuthService.deleteUser(i);
  };

  redirectToProfile = () => {
    this.props.history.push('/profile');
}

redirectToSignUpEmployee = () => {
  this.props.history.push('/SignUpEmployee');
}

  handleUpdateField = () => {
    console.log("this.state.apiResponse: ", this.state.apiResponse);

    const formData = {}
    formData["fields"] = this.state.apiResponse
    console.log("formData: ", formData);
    businessService.updateFields(this.state.businessName, this.state.branch, formData)
      .then(() => {
        alert("update success")
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.editMode.status);
    return (
      <div>
        <div className="row clearfix">
          <div className="col-md-12 column">
            <table
              className="table table-bordered table-hover"
              id="tab_logic"
            >
              <thead>
                <tr style={{ backgroundColor: "#F2C035" }}>
                  {/* <th className="text-center"> </th> */}
                  <th colSpan="2"> รายการพนักงาน</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                <tr style={{ backgroundColor: "#CCC7BB" }}>
                  <td className="text-center">รายชื่อ</td>
                  <td className="text-center" style={{ width: "200px" }}>จัดการ</td>
                </tr>
                {this.state.listEmployees.map((item, i) => (
                  <tr id="addr0" key={i}>

                    <td>
                    <p>{item.username}</p>
                    </td>
                    <td className="text-center">
                          <div>
                            <button
                              style={{ marginRight: "10px" }}
                              className={"btn btn-warning btn-sm"}
                              onClick={() => this.redirectToProfile()}
                            >
                              More Detail
                          </button>

                            <button
                              className={"btn btn-outline-danger btn-sm"}
                              onClick={() => this.handleDelete(item.id)}
                            >
                              Remove
                          </button>
                          </div>
                        

                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="text-left">
                    <button  
                      className={"btn btn-outline-primary btn-sm "}
                      onClick={() => this.redirectToSignUpEmployee()}
                      >
                      เพิ่มพนักงาน
                    
                      </button>
                  </td>
                  <td className="text-center">

                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}

// =================================================================================================

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(ListEmployees)
