import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import UserService from "../services/user.service";
import { Redirect, Link, useHistory } from "react-router-dom";
import { addqueue } from "../actions/userQueue";
import { connect } from "react-redux";
import { clearMessage, setMessage } from "../actions/message";
import businessService from '../services/business.service';
import GetQueueHeader from './GetQueueHeader';
class GetInQueue extends Component {
  constructor(props) {
    super(props);
    this.handleAddqueue = this.handleAddqueue.bind(this);
    this.onChangeSerivce = this.onChangeSerivce.bind(this);
    this.state = {
      show: false,
      redirectFlag: false,
      successful: false,
      storeName: this.props.storeName,
      branch: this.props.branch,
      apiResponse: [],
      serviceList: [],
      isRestaurant: false,
      formElements: {
        queue_type: 'NOR',
        status: 'waiting',
        business_name: this.props.storeName,
        branch: this.props.branch,
        username: '',
        email:'',
        queueDetail: {}
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
        console.log("apiResponse: " + res.data.BusinessDetail[0].tableDetail);
        this.setState({
          apiResponse: res.data.BusinessDetail[0].fields,
          serviceList: res.data.BusinessDetail[0].tableDetail,
          isRestaurant: (res.data.BusinessDetail[0].categories === "ร้านอาหาร" ? true : false),
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
    if (name == "ชื่อ-นามสกุล") {
      this.setState({
        ...this.state,
        formElements: {
          ...this.state.formElements,
          username: value,
          queueDetail: updateForm
        }
      })

    } else if(name == "Email"){
      console.log('name == "Email"');
      this.setState({
        formElements: {
          ...this.state.formElements,
          email: value,
          ...this.state.formElements.queueDetail,
          queueDetail: updateForm
        }
      })
    } else {
      this.setState({
        ...this.state,
        formElements: {
          ...this.state.formElements,
          queueDetail: updateForm
        }
      })
    }
  }

  onChangeSerivce(e) {
    console.log(e.target.value);
    console.log("e.target ", e.target);
    const value = e.target.value;

    let updateForm = { ...this.state.formElements.queueDetail };
    updateForm['service'] = value;

    this.setState({
      ...this.state,
      formElements: {
        ...this.state.formElements,
        queue_no: value,
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
    if (this.state.formElements.username === '') {
      this.props.dispatch(setMessage("กรุณากรอกข้อมูลให้ครบ"));
    }
    this.setState({
      show: true,
    });
  };
  render() {
    const { message } = this.props;
    const { apiResponse, serviceList, isRestaurant } = this.state;

    const disableButton = ((this.state.formElements.username !== '') && (this.state.formElements.queueDetail.Email !== '') && (this.state.formElements.queue_no !== ''));
    console.log("disableButton", disableButton);

    console.log("serviceList", serviceList);

    if (this.state.redirectFlag) {
      return (<Redirect
        to={{
          pathname: "/currentQueue/" + this.state.formElements.business_name + "/" + this.state.formElements.username,
          state: { username: this.state.formElements.username, business_name: this.state.formElements.business_name }
        }}
      />)
    }
    return (
      <div className="container" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        {/* <GetQueueHeader storeName={this.state.storeName} branch={this.state.branch} /> */}
        <div className="row d-block" >
          <form id="contact-form" className="form" style={{ margin: "20px" }}
            ref={(c) => {
              this.form = c;
            }}>

            {apiResponse.map((item, i) => (
              <div className="form-inline">
                <label className="col-xs-3 col-sm-3 col-md-3 form-label" style={{ justifyContent: "left" }}>{item}
                </label>
                <input
                  type="text"
                  className=" col-xs-9 col-sm-9 col-md-9 form-control"
                  id={item}
                  name={item}
                  placeholder={item}
                  tabIndex={i += 1}
                  required={item === "รายละเอียด" ? false : true}
                  onChange={this.onFormChange}
                  style={{ marginBottom: "10px" }}
                />
              </div>

            ))}

              <div className="form-inline" name="services">
                <label className="col-xs-3 col-sm-3 col-md-3 form-label" style={{ justifyContent: "left" }} htmlFor="services">ประเภทบริการ</label>
                <select onChange={this.onChangeSerivce} className="form-control" style={{ marginBottom: "10px" }}>
                  <option selected value="กรุณาเลือกประเภทบริการ">กรุณาเลือกประเภทบริการ</option>
                  {serviceList.map((item) => (
                    console.log("item ", item),
                    <option name={item.name} value={item.typeSymbol} >{item.name}</option>
                  ))}
                </select>
              </div>


            <div className="text-center" style={{ margin: "20px" }}>
              <Button variant="primary" style={{ marginRight: "2%" }} onClick={this.handleShow} disabled={this.props.demo === true ? true : false}>
                เข้าคิว/ต่อคิว
            </Button>

              <Button variant="danger" onClick={() => window.history.back()}>
                ย้อนกลับ
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
                <Button variant="primary" onClick={this.handleAddqueue} disabled={!disableButton}>
                  ยืนยัน
              </Button>
              </Modal.Footer>
            </Modal>
          </form>
        </div>

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
