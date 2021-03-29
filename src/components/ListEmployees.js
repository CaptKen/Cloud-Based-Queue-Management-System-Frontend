import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'
import UserService from "../services/user.service";
import { Button, Modal, Accordion, Card , OverlayTrigger, Tooltip} from "react-bootstrap";
import businessService from '../services/business.service';
import { render } from "react-dom";
import { connect } from "react-redux";
import AuthService from "../services/auth.service";
import DetailEmployee from "./DetailEmployee";
import { Item } from 'semantic-ui-react';
import SignUpEmployee from './SignUpEmployee';

class ListEmployees extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      apiResponse: [],
      listEmployees: [],
      branch: '',
      editMode: {
        status: false
      },
      businessName: this.props.businessName,
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      rows: [{}],
      editMode: {
        status: false,
        rowKey: null
      },
      isShow: false,
    };
  }

  componentDidMount = () => {
    const user = this.props.user;
    if (user) {
      // this.setState({
      //   currentUser: user,
      //   branch: user.branch,
      //   businessName: user.businessName,
      // });
      AuthService.listEmployee(this.props.match.params.businessName, this.props.match.params.branch).then(
        response => {
          console.log("response.data.listEmployee");
          console.log(response.data);

          const employeeList = response.data.filter((employee) => {
            console.log("employee.roles", employee.roles[0].name != "ROLE_MODERATOR");
            return employee.roles[0].name != "ROLE_MODERATOR";
          })

          console.log("1111" + user.businessName);
          console.log("1111" + user.branch);
          this.setState({
            listEmployees: employeeList,
            currentUser: user,
            branch: user.branch,
            businessName: user.businessName,
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

  toggleShow = () => {
    console.log("ClickShow!!!!!!!!!!!!!!!!!!!!!")
    this.setState(state => ({ isShow: true }));
  };




  redirectToDetailEmployee = () => {
    this.props.history.push('/DetailEmployee');
  }


  handleDetail = (name, email, telephone) => () => {
    console.log("click!!!!!!!!!!!");
    DetailEmployee.addDetailToList(name, email, telephone);
    this.props.history.push('/DetailEmployee');
    this.redirectToDetailEmployee();
  };


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

  handleRemoveSpecificRow = (i, id) => {
    const apiResponse = [...this.state.apiResponse];
    apiResponse.splice(i, 1);
    this.setState({ apiResponse });
    AuthService.deleteUser(id);
    window.location.reload();
  };

  handleClose = (e) => {
    this.setState({
      isShow: false,
    });

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
    window.location.reload();
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
    const { user: currentUser } = this.props;
    console.log(this.state.editMode.status);
    return (
      <div className="container">
        <h1 className="h1 text-center">ข้อมูลพนักงาน</h1>
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
                  console.log("listEmployees.map((item, i) : ", item, i),
                  <tr id="addr0" key={i}>

                    <td>

                      <Accordion>
                        <div>
                          <div>
                            
                            <OverlayTrigger
                              placement="right"
                              overlay={
                                <Tooltip id={`tooltip-right`}><strong>click for more detail</strong>. </Tooltip>
                              }
                            >
                              <Accordion.Toggle as={Button} variant="link" eventKey="0" ><p className="d-inline-flex" style={{ color: 'black' }}>{item.username}</p>{' '} <i class="fas fa-info-circle"></i> </Accordion.Toggle>
                            </OverlayTrigger>
                          </div>
                          <Accordion.Collapse eventKey="0">
                            <div className="container">
                              <div>
                                <div className="d-block">
                                  <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>ชื่อผู้ใช้งาน:</strong>
                                  {item.username}
                                </div>

                                <div className="d-block">
                                  <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>อีเมลล์:</strong>
                                  {item.email}
                                </div>

                                <div className="d-block">
                                  <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>เบอร์โทรศัพท์:</strong>
                                  {item.telephone}
                                </div>
                              </div>
                            </div>
                          </Accordion.Collapse>
                        </div>
                      </Accordion>
                    </td>
                    <td className="text-center">
                      <div>
                        {/* <button
                          style={{ marginRight: "10px" }}
                          className={"btn btn-warning btn-sm"}
                          onClick={this.toggleShow}
                        >
                          {!this.state.isShow ? <DetailEmployee itemEmployee={item} /> : null}
                              More Detail
                          </button> */}
                        <button
                          className={"btn btn-outline-danger btn-sm"}
                          onClick={() => this.handleRemoveSpecificRow(i, item.id)}
                        >Remove</button>

                        {this.state.isShow ? (
                          console.log("eiei : ", this.state.listEmployees[i]),
                          <Modal show={this.state.isShow} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                              <h1 className="h1 text-center">ข้อมูลพนักงาน</h1>
                            </Modal.Header>
                            <Modal.Body>
                              <div className="container">
                                <form className="form">
                                  <div>
                                    <div className="form-inline">
                                      <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>ชื่อผู้ใช้งาน:</strong>
                                      {this.state.listEmployees[i].username}
                                    </div>

                                    <div className="form-inline">
                                      <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>อีเมลล์:</strong>
                                      {item.email}
                                    </div>

                                    <div className="form-inline">
                                      <strong className="col-6 form-label" style={{ textAlignLast: 'right' }}>เบอร์โทรศัพท์:</strong>
                                      {item.telephone}
                                    </div>
                                  </div>
                                </form>

                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <button className={"btn btn-danger btn-lg"}>ย้อนกลับ</button>
                            </Modal.Footer>
                          </Modal>
                        ) : null}

                      </div>
                    </td>
                  </tr>
                )
                )
                }
                <tr>
                  <td colSpan="2" className="text-left">
                    {/* <button
                      className={"btn btn-outline-primary btn-sm"}
                      onClick={() => this.redirectToSignUpEmployee()}
                    >
                      เพิ่มพนักงาน
                      </button> */}
                    <SignUpEmployee />
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
