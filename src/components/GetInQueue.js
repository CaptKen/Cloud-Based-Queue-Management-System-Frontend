import React, { Component } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import { addqueue } from "../actions/userQueue";
import { connect } from "react-redux";
import { clearMessage, setMessage } from "../actions/message";
import businessService from '../services/business.service';
import { getInprocessQueue, getWaitingQueue, findQueueForShowQueuePage } from "../actions/userQueue";
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
      isLoading: false,
      formElements: {
        queue_no: '',
        queue_type: 'ต่อคิว',
        status: 'Waiting',
        business_name: this.props.storeName,
        branch: this.props.branch,
        username: '',
        email: '',
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
    this.props.dispatch(findQueueForShowQueuePage(this.state.storeName))
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

  // componentDidMount() {
  //   console.log("storeName", this.state.storeName);
  //   console.log("branch", this.state.branch);
  //   businessService.getBusinessDetail(this.state.storeName, this.state.branch).then(
  //     res => {
  //       console.log("apiResponse: " + res.data.BusinessDetail[0].tableDetail);
  //       this.setState({
  //         serviceList: res.data.BusinessDetail[0].tableDetail,
  //       })
  //     }
  //   )
  // }

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

    } else if (name == "Email") {
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
    var serviceTypeDesc;
    this.state.serviceList.forEach((item) => {
      console.log("serviceList item : ", item);
      if (value === item.typeSymbol) {
        serviceTypeDesc = item.name
      }
    })
    let updateForm = { ...this.state.formElements.queueDetail };
    updateForm['service'] = value;

    this.setState({
      ...this.state,
      formElements: {
        ...this.state.formElements,
        queue_no: value,
        serviceTypeDesc: serviceTypeDesc,
        queueDetail: updateForm
      }
    })
  }

  handleAddqueue(e) {
    e.preventDefault();
    this.setState({
      successful: false,
      isLoading: true
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
          isLoading: false,
          redirectFlag: true
        });
      })
      .catch(() => {
        this.setState({
          successful: false,
          isLoading: false
        });
      });
  }

  handleClose = (e) => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    console.log("now time : ", new Date());
    console.log("show: ", this.state.formElements);
    this.props.dispatch(clearMessage()); // clear message when changing location
    if (this.state.formElements.username === '' || this.state.formElements.email === '' || this.state.formElements.queue_no === '' || this.state.formElements.queue_no === "กรุณาเลือกประเภทบริการ") {
      this.props.dispatch(setMessage("กรุณากรอกข้อมูลที่จำเป็น (*) ให้ครบ"));
    }

    let updateForm = { ...this.state.formElements.queueDetail };
    updateForm["book_time"] = new Date();

    this.setState({
      show: true,
      formElements: {
        ...this.state.formElements,
        ...this.state.formElements.queueDetail,
        queueDetail: updateForm,
        ["book_time"]: new Date()
      }
    });
  };
  render() {
    const { message } = this.props;
    const { apiResponse, serviceList, isRestaurant, isLoading } = this.state;

    const disableButton = ((this.state.formElements.username !== '') && (this.state.formElements.queueDetail.Email !== '') && (this.state.formElements.queue_no !== '') && (this.state.formElements.queue_no !== "กรุณาเลือกประเภทบริการ") && (!isLoading));
    console.log("disableButton", disableButton);

    console.log("serviceList", serviceList);

    if (this.state.redirectFlag) {
      return (<Redirect
        to={{
          pathname: "/currentQueue/" + this.state.formElements.business_name + "/" + this.state.formElements.username,
          state: { username: this.state.formElements.username, email: this.state.formElements.email, business_name: this.state.formElements.business_name }
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
                <label className="col-xs-3 col-sm-3 col-md-3 form-label form-inline" style={{ justifyContent: "left" }}>{item}<p style={{ color: "red" }}>{item === "ชื่อ-นามสกุล" || item === "Email" ? " *" : ""}</p>
                </label>
                <input
                  type="text"
                  className="col-xs-9 col-sm-9 col-md-9 form-control"
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
              <label className="col-xs-3 col-sm-3 col-md-3 form-label form-inline" style={{ justifyContent: "left" }} htmlFor="services">ประเภทบริการ <p style={{ color: "red" }}>*</p></label>
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
              <Modal.Body style={{ alignSelf: "center" }}>
                {isLoading ? (
                  <Spinner className="m-3" animation="border" style={{ alignSelf: "center" }} variant="primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                ) : "ต้องการเข้าคิว/ต่อคิวหรือไม่"}
              </Modal.Body>
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
  
  console.log("mapStateToProps : ", state);
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(GetInQueue);
