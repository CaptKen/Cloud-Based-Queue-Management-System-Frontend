import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class GetInQueue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  handleShow = () => {
    console.log("show");
    this.setState({
      show: true,
    });
  };
  render() {
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
              name="firstname"
              placeholder="Firstname"
              tabIndex="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lastname</label>
            <input
              type="text"
              className="form-control"
              id="Lastname"
              name="Lastname"
              placeholder="Lastname"
              tabIndex="1"
              required
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
