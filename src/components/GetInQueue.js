import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

class GetInQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      redirectFalg: false,
      formElements: {
        name: '',
        surname: '',
        email: '',
        telephone: '',
        message: ''
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
    console.log("Hello click")
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
        console.log("res " + res.data);

        if (res.data === 'OK') {
          this.setState({
            show: false,
            redirectFalg: true
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })


  };
  handleShow = () => {
    console.log("show");
    this.setState({
      show: true,
    });
  };
  render() {
    if (this.state.redirectFalg) {
      return <Redirect
        to={{
          pathname: "/CurrentQueue",
          state: { name: this.state.formElements.name }
        }}
      />
    }
    return (
      <div className="container">
        <div className="text-center">
          <h2>ชื่อร้าน</h2>
        </div>
        <form id="contact-form" className="form" onSubmit={this.submit}>
          <div className="form-group">
            <label className="form-label">Firstname</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="name"
              placeholder="Firstname"
              tabIndex="1"
              required
              onChange={this.onFormChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lastname</label>
            <input
              type="text"
              className="form-control"
              id="Lastname"
              name="surname"
              placeholder="Lastname"
              tabIndex="1"
              required
              onChange={this.onFormChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Your Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Your Email"
              tabIndex="2"
              required
              onChange={this.onFormChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Your Phone</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              name="telephone"
              placeholder="Your Phone"
              tabIndex="2"
              required
              onChange={this.onFormChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              rows="5"
              cols="50"
              name="message"
              className="form-control"
              id="message"
              placeholder="Message..."
              tabIndex="4"
              required
              onChange={this.onFormChange}
            ></textarea>
          </div>
          <div className="text-center">
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

export default GetInQueue;
