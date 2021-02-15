import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import UserService from "../services/user.service";
import { Redirect } from "react-router-dom";
import { addqueue } from "../actions/userQueue";
import { connect } from "react-redux";
import { clearMessage } from "../actions/message";
import businessService from '../services/business.service';

class GetInQueue extends Component {
  constructor(props) {
    super(props);
    this.handleAddqueue = this.handleAddqueue.bind(this);
    this.state = {
      show: false,
      redirectFlag: false,
      successful: false,
      storeName: this.props.storeName,
      branch: this.props.branch,
      apiResponse:[],
      formElements: {
        queue_type: 'NOR',
        status: 'waiting',
        business_name: this.props.storeName,
        username: '',
        queueDetail:{}
      }
    };
  }

  componentDidMount() {
    
    this.setState({
      redirectFlag: false
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
  }

  onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("name, value : ", name, value);
    let updateForm = { ...this.state.formElements.queueDetail };
      updateForm[name] = value;
    if (name=="ชื่อ-นามสกุล") {
      this.setState({
        ...this.state,
        formElements:{
          ...this.state.formElements,
          username: value,
          queueDetail : updateForm
        }
      })
      
    }else{
      this.setState({
        ...this.state,
        formElements: {
          ...this.state.formElements,
          queueDetail : updateForm
        }
      })
    }
  }

  handleAddqueue(e) {
    e.preventDefault();
    this.setState({
      successful: false,
    });
    const formData = {};
    for (let name in this.state.formElements) {
      formData[name] = this.state.formElements[name];
    }

    console.log(formData);

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
    });
  };

  handleShow = () => {
    console.log("show");
    this.props.dispatch(clearMessage()); // clear message when changing location
    this.setState({
      show: true,
    });
  };
  render() {
    const { message } = this.props;
    const { apiResponse } = this.state;

    if (this.state.redirectFlag) {
      return (<Redirect
        to={{
          pathname: "/currentQueue/"+ this.state.formElements.business_name + "/" +this.state.formElements.username,
          state: { username: this.state.formElements.username, business_name: this.state.formElements.business_name }
        }}
      />)
    }
    return (
      <div className="container" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <form id="contact-form" className="form" onSubmit={this.submit} style={{ margin: "20px" }}>
          {apiResponse.map((item, i) => (
            <div className="form-inline">
            <label className="col-3 form-label" style={{ justifyContent: "left" }}>{item}
            </label>
            <input
              type="text"
              className=" col-9 form-control"
              id={item}
              name={item}
              placeholder={item}
              tabIndex={i+=1}
              required
              onChange={this.onFormChange}
              style={{ marginBottom: "10px" }}
            />
          </div>
          ))}
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
              required
              onChange={this.onFormChange}
              style={{ marginBottom: "10px" }}
            />
          </div>

          <div className="form-inline">
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
              onChange={this.onFormChange}
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
              style={{ marginBottom: "10px" }}
            />
          </div>

          <div className="form-inline">
            <label className="form-label col-3" style={{ justifyContent: "left" }}>รายละเอียดเพิ่มเติม
            </label>
            <textarea
              rows="5"
              cols="100"
              name="user_detail"
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
              เข้าคิว/ต่อคิว
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
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(GetInQueue);
