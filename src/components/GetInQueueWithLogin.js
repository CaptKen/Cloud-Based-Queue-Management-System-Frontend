import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";

class GetInQueueWithLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      redirectFlag: false,
      formElements: {
        name:'',
        surname:'',
        email:'',
        message:'',
        noOfCus:''
      }
    };
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


  handleClose = (e) => {
    let config = {
      headers: {
        'Access-Control-Allow-Origin': "*",
      },
    }
    e.preventDefault();
      const formData = {};
      for (let name in this.state.formElements) {
          if (name === 'formValid') {
              console.log("formValidformValidformValid");
              continue;
          }
          formData[name] = this.state.formElements[name];
      }
      console.log(formData);

      axios.post('/addqueue', formData, config)
          .then((res) => {
            console.log("res" + res.data);
        })
        .catch((err) => {
            console.log(err);
        })

    this.setState({
      show: false,
      redirectFlag: true
    });
    
  };
  handleShow = () => {
    console.log("show");
    this.setState({
      show: true,
    });
  };
  render() {
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
        <form id="contact-form" className="form" onSubmit={this.submit} style={{margin:"20px"}}>
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
              เข้าคิว/ต่อคิว
            </Button>
          </div>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>ยืนยันการต่อคิว</Modal.Title>
            </Modal.Header>
            <Modal.Body> ต้องการเข้าคิว/ต่อคิวหรือไม่</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                ยกเลิก
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                ยืนยัน
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    );
  }
}

export default GetInQueueWithLogin;
