import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import UserService from "../services/user.service";
import businessService from '../services/business.service';
import { connect } from "react-redux";
import { addqueue } from "../actions/userQueue"

import { clearMessage } from "../actions/message";

class GetInQueueWithLogin extends Component {
  constructor(props) {
    super(props);
    this.handleAddqueue = this.handleAddqueue.bind(this);
    this.state = {
      show: false,
      redirectFlag: false,
      currentUser: undefined,
      successful: false,
      storeName: this.props.storeName,
      branch: this.props.branch,
      apiResponse: [],
      formElements: {
        username: '',
        queue_type: 'NOR',
        status: 'waiting',
        business_name: this.props.storeName,
        queueDetail: {}
      }
    };
  }

  componentDidMount() {
    // const user = this.props.user;
    // console.log(user);
    this.setState({
      redirectFlag: false,
      formElements: {
        ...this.state.formElements,
        username: this.props.currentUser.username,
        business_name: this.props.storeName,
        queue_type: 'normal',
        status: 'waiting',
      }
    });
    console.log("storeName", this.state.storeName);
    console.log("branch", this.state.branch);
    businessService.getBusinessDetail(this.state.storeName, this.state.branch).then(
      res => {
        console.log("apiResponse: " + res.data.BusinessDetail[0].fields);
        this.setState({
          apiResponse: res.data.BusinessDetail[0].fields,
        })
      }
    )
    // if (user) {
    //   this.setState({
    //     currentUser: user,
    //     formElements: {
    //       name:user.username,
    //       surname:user.username,
    //       email:user.email,
    //     }
    //   });
    // }
  }

  onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("name, value : ", name, value);
    let updateForm = { ...this.state.formElements };
    updateForm[name] = value;
    this.setState({
      ...this.state,
      formElements: {
        ...this.state.formElements,
        queueDetail: updateForm
      }
    })

  }
  handleAddqueue(e) {
    e.preventDefault();
    this.setState({
      successful: false,
    });
    const formData = {};
    for (let name in this.state.formElements) {
      if (name === 'formValid') {
        console.log("formValidformValidformValid");
        continue;
      }
      console.log('name', name);
      formData[name] = this.state.formElements[name];
    }
    console.log("formData", formData);

    const { history } = this.props;
    this.props.dispatch(addqueue(formData))
      .then(() => {
        console.log("in dispatch");
        this.setState({
          successful: true,
          redirectFlag: true
        });
      })
      .catch(() => {
        this.setState({
          successful: false,
        });
      });
  }


  handleClose = (e) => {
    this.setState({
      show: false,
      redirectFlag: false
    });

  };
  handleShow = () => {
    console.log("show");
    this.props.dispatch(clearMessage());
    this.setState({
      show: true,
    });
  };

  handleValue = (key) => {
    let value;
    switch (key) {
      case "ชื่อ-นามสกุล":
        return this.state.formElements.username;
      case "Email":
        return this.props.currentUser.email;
      case "เบอร์โทรศัพท์":
        return this.props.currentUser.telephone
    
      default:
        break;
    }
  }

  render() {
    const { message } = this.props;
    const { currentUser } = this.state;
    const { apiResponse } = this.state;

    console.log("currentUser", this.props.currentUser);
    console.log("business_name", this.props.storeName);
    if (this.state.redirectFlag) {
      return (<Redirect
        to={{
          pathname: "/currentQueue/"+ this.state.formElements.business_name + "/" +this.state.formElements.username,
          state: { username: this.state.formElements.username, business_name: this.state.formElements.business_name }
        }}
      />)
    }
    return (
      <div className="container">
        <form id="contact-form" className="form" onSubmit={this.submit} ref={(c) => {
          this.form = c;
        }} style={{ margin: "20px" }}>

          {/* <div className="form-inline">
            <label className="col-3 form-label" style={{ justifyContent: "left" }}>ชื่อผู้จอง
            </label>
            <input
              type="text"
              className=" col-9 form-control"
              id="firstname"
              name="username"
              placeholder="ชื่อ"
              tabIndex="1"
              value={this.state.formElements.username}
              required
              onChange={this.onFormChange}
              style={{ marginBottom: "10px" }}
            />
          </div> */}
          {apiResponse.map((item, i) => (
            <div className="form-inline">
            <label className="col-3 form-inline" style={{ justifyContent: "left" }}>{item}</label>
            <input
              type="text"
              className="form-control col-9"
              id={item}
              name={item}
              placeholder={item}
              tabIndex={i += 1}
              required
              onChange={this.onFormChange}
              value={this.handleValue(item)}
              readOnly={item == "เบอร์โทรศัพท์" || item == "Email"? true : false}
              style={{ marginBottom: "10px" }}
            />
          </div>
          ))}
          {/* <div className="form-inline">
            <label className="col-3 form-inline" style={{ justifyContent: "left" }}>เบอร์โทรศัพท์
            </label>
            <input
              type="text"
              className="form-control col-9"
              id="Lastname"
              name="user_telephone"
              placeholder="เบอร์โทรศัพท์"
              tabIndex="1"
              required
              value={this.props.currentUser.telephone}
              onChange={this.onFormChange}
              readOnly
              style={{ marginBottom: "10px" }}
            />
          </div>

          <div className="form-inline">
            <label className="form-inline col-3" style={{ justifyContent: "left" }}>อีเมลล์
            </label>
            <input
              type="email"
              className="form-control  col-9"
              id="email"
              name="user_email"
              placeholder="อีเมลล์"
              tabIndex="2"
              required
              onChange={this.onFormChange}
              readOnly
              value={this.props.currentUser.email}
              style={{ marginBottom: "10px" }}
            />
          </div>

          <div className="form-inline">
            <label className="form-label col-3" style={{ justifyContent: "left" }}>รายละเอียดเพิ่มเติม
            </label>
            <textarea
              rows="5"
              cols="100"
              name="message"
              className="form-control col-9"
              id="message"
              placeholder="รายละเอียดเพิ่มเติม..."
              tabIndex="4"
              required
              onChange={this.onFormChange}
              style={{ marginBottom: "10px" }}
            ></textarea>

          </div> */}

          {/* <div className="form-inline">
            <label className="form-label col-3" style={{justifyContent:"left"}}>จำนวนคน</label>
            <input
              type="number"
              className="form-control col-9"
              id="noOfCus"
              name="noOfCus"
              placeholder="จำนวนคน"
              tabIndex="2"
              required
              onChange={this.onFormChange}
            />
          </div> */}
          <div className="text-center" style={{ margin: "20px" }}>
            <Button variant="primary" onClick={this.handleShow}>
              บันทึก
            </Button>
          </div>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>ยืนยันการต่อคิว</Modal.Title>
            </Modal.Header>
            <Modal.Body> ต้องการเข้าคิว/ต่อคิวหรือไม่</Modal.Body>
            {message && (
              <div className="form-group">
                <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                  {message}
                </div>
              </div>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                ยกเลิก
              </Button>
              <Button variant="primary" onClick={this.handleAddqueue}>
                ยืนยัน
              </Button>

            </Modal.Footer>
          </Modal>
        </form>

      </div>
    );
  }
}
function mapStateToProps(state) {
  // const { user } = state.auth;
  const { message } = state.message;
  return {
    // user,
    message
  };
}

export default connect(mapStateToProps)(GetInQueueWithLogin);
