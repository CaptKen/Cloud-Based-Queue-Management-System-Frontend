import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import UserService from "../services/user.service";
import { connect } from "react-redux";
import {addqueue} from "../actions/userQueue"

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
      formElements: {
        name:'',
        surname:'',
        email:'',
        message:'',
        noOfCus:''
      }
    };
  }

  componentDidMount() {
    const user = this.props.user;
    console.log(user);
    this.setState({
      redirectFlag: false
    });
    if (user) {
      this.setState({
        currentUser: user,
        formElements: {
          name:user.username,
          surname:user.username,
          email:user.email,
        }
      });
    }
  }

  onFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    let updateForm = { ...this.state.formElements };
    updateForm[name] = value;

    this.setState({
        ...this.state,
        formElements: updateForm
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
          formData[name] = this.state.formElements[name];
      }
      console.log(formData);

    const {history } = this.props;
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
      redirectFlag: true
    });
    
  };
  handleShow = () => {
    console.log("show");
    this.props.dispatch(clearMessage());
    this.setState({
      show: true,
    });
  };
  render() {
    const { message } = this.props;
    const {currentUser} = this.state;
    if (this.state.redirectFlag) {
      return (<Redirect
      to={{
      pathname: "/currentQueue",
      state: { name: this.state.formElements.name }
    }}
  />)
    }
    return (
      <div className="container">
        <form id="contact-form" className="form" onSubmit={this.submit} ref={(c) => {
              this.form = c;
            }} style={{margin:"20px"}}>
          <div className="form-inline">
            <label className="form-label col-3" style={{justifyContent:"left"}}>รายละเอียดเพิ่มเติม
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
              style={{marginBottom:"10px"}}
            ></textarea>
            
          </div>

          <div className="form-inline">
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
          </div>
          <div className="text-center" style={{margin:"20px"}}>
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
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
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
  const { user } = state.auth;
  const { message } = state.message;
  return {
    user,
    message
  };
}

export default connect(mapStateToProps)(GetInQueueWithLogin);
