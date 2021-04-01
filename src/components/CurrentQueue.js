import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from '../services/user.service';
import { Modal, Button } from "react-bootstrap";
import { clearMessage } from "../actions/message";
import BookQueueWithLogin from "./BookQueueWithLoginV2";
import DatePicker from 'react-datepicker';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { addDays, subDays } from "date-fns";
import userService from "../services/user.service";

// import { cancelQueue } from "../actions/userQueue";

class CurrentQueue extends Component {
  constructor(props) {
    super(props);
    this.handleCancelQueue = this.handleCancelQueue.bind(this);
    this.handleAddTimeQueue = this.handleAddTimeQueue.bind(this);
    this.handleSaveEdit = this.handleSaveEdit.bind(this);
    this.isPassDate = this.isPassDate.bind(this);
    this.setBook_time = this.setBook_time.bind(this)
    this.state = {
      show: false,
      queueDetail: [],
      business_name: '',
      waitngTime: '',
      allQueueWait: '',
      username: '',
      startDate: null,
      cancelSuccessful: false,
      redirect: false,
      time: new Date(),
      timer: '',
      currentUser: undefined,
      showEdit: false,
      listWithFilterByDate: [],
      booked: [],
    };
  }

  componentDidMount() {
    const { time } = this.state;

    const { history } = this.props;
    console.log(this.state.redirect == false);
    const storeName = this.props.match.params.businessName;
    // const username = this.props.match.params.username;
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user
      })
    }
    if (this.props.location.state == undefined || this.props.location.state == null || this.props.location.state == '' || this.props.match.params.businessName == undefined || this.props.match.params.businessName == '' || this.props.match.params.businessName == null || this.props.match.params.username == undefined) {
      history.push("/home");
    } else {
      const username = this.props.location.state.username;
      const email = this.props.location.state.email;
      const business_name = this.props.location.state.business_name;

      UserService.getQueueDetail(storeName, username, email).then(
        response => {
          console.log("response.data.QueueDetail.userQueueDetail", response.data.QueueDetail.userQueueDetail);
          console.log("response.data.QueueDetail", response.data.QueueDetail.userQueueDetail[0].book_time);
          const timer = this.diffTimeCal(new Date(response.data.QueueDetail.userQueueDetail[0].book_time));
          this.setState({
            queueDetail: response.data.QueueDetail.userQueueDetail[0],
            business_name: business_name,
            username: username,
            startDate: new Date(response.data.QueueDetail.userQueueDetail[0].book_time),
            allQueueWait: response.data.QueueDetail.allQueueWait,
            waitngTime: response.data.QueueDetail.wait_time,
            time: new Date(response.data.QueueDetail.userQueueDetail[0].book_time)
          })
          this.interval = setInterval(() => {
            const diffTime = Math.abs(new Date(response.data.QueueDetail.userQueueDetail[0].book_time) - new Date());
            const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 30;
            const mins = Math.floor(diffTime / (1000 * 60)) % 60;
            const hours = Math.floor(diffTime / (1000 * 60 * 60)) % 24;
            const str = (days + " วัน " + hours + " ชั่วโมง " + mins + " นาที");
            console.log(str);
            this.setState({
              timer: str
            })
          }, 30000)
        },
        error => {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      );
    }
    const bookedLists = [];
    userService.listBookedTimeQueue(this.state.storeName)
      .then((response) => {
        console.log(response.data.bookedTime);
        const bookedListsWithKey = response.data.bookedTime.filter((booked) => {
          return booked.book_time !== null;
        })

        bookedListsWithKey.forEach((bookedlist) => {
          bookedLists.push(new Date(bookedlist.book_time))
        })
        this.setState({
          booked: bookedLists,
          listWithFilterByDate: this.filterByDate(new Date())
        })
      })
  }

  setBook_time = (e) => {
    console.log("datepick(e) ", e);
    console.log('name == "book_time"');

    let updateForm = { ...this.state.queueDetail.queueDetail };
    updateForm["book_time"] = e;

    let lst = this.filterByDate(e);
    console.log("lst ", lst);

    this.setState({
      startDate: new Date(e),
      listWithFilterByDate: lst,
      queueDetail: {
        ...this.state.queueDetail,
        book_time: new Date(e),
        queueDetail: updateForm
      }

    })
  }

  handleSaveEdit() {
    console.log("queueDetail before update: ", this.state.queueDetail);

    const formData = {};
    for (let name in this.state.queueDetail) {
      if (name === 'formValid') {
        console.log("formValidformValidformValid");
        continue;
      }
      console.log('name', name);
      formData[name] = this.state.queueDetail[name];
    }
    console.log("formData", formData);

    userService.editQueueDetail(formData, this.state.username)
      .then(() => {
        this.setState({
          showEdit: false
        });
        alert("แก้ไขเวลาที่จองสำเร็จ")
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleShow = () => {
    console.log("show cancel");
    this.props.dispatch(clearMessage()); // clear message when changing location
    this.setState({
      show: true,
    });
  };

  handleShowAddTime = () => {
    console.log("show add time");
    this.props.dispatch(clearMessage()); // clear message when changing location
    this.setState({
      showAddTime: true,
    });
  };

  handleShowEdit = () => {
    console.log("show edit");
    this.props.dispatch(clearMessage()); // clear message when changing location
    this.setState({
      showEdit: true,
    });
  };

  handleClose = (e) => {
    this.setState({
      show: false,
      showEdit: false,
      showAddTime: false
    });
  };
  handleCancelQueue(e) {
    const { history } = this.props;
    console.log(this.state.queueDetail);
    e.preventDefault();
    this.setState({
      successful: false,
    });
    UserService.cancelQueue(this.state.username, this.state.queueDetail)
      .then(() => {
        this.setState({
          cancelSuccessful: true,
        });
      })
      .catch(() => {
        this.setState({
          cancelSuccessful: false,
        });
      });
    alert("ยกเลิกคิวสำเร็จ")
    window.history.back();
  }

  handleAddTimeQueue(e) {
    const { history } = this.props;
    console.log(this.state.queueDetail);
    e.preventDefault();
    this.setState({
      successful: false,
    });
    UserService.addTimeQueue(this.state.username, this.state.queueDetail)
      .then(() => {
        this.setState({
          addTimeSuccessful: true,
        });
      })
      .catch(() => {
        this.setState({
          addTimeSuccessful: false,
        });
      });
    alert("ต่อเวลาสำเร็จ")
    window.location.reload();
  }

  diffTimeCal = (a) => {
    const diffTime = Math.abs(a - new Date());
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 30;
    const mins = Math.floor(diffTime / (1000 * 60)) % 60;
    const hours = Math.floor(diffTime / (1000 * 60 * 60)) % 24;
    const str = (days + " วัน " + hours + " ชั่วโมง " + mins + " นาที");

    this.setState({
      timer: str
    })
  }

  filterByDate = allListBook => {
    let result = this.state.booked.filter((lst) => {
      console.log(lst.getDate() === new Date(allListBook).getDate());
      // lst.getDate()
      return lst.getDate() === new Date(allListBook).getDate();
    })
    return result
  }

  isPassDate = (date) => {
    return subDays(new Date(), 1) < date;
  }

  filterPassedTime = time => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  }

  render() {
    const { message } = this.props;
    const storeName = this.props.match.params.businessName;
    const nowDateTime = new Date();
    const { timer, currentUser, listWithFilterByDate } = this.state;
    const initialFilterByDate = this.filterByDate(new Date());
    const closeTimeList = [setHours(setMinutes(new Date(), 0), 22),
    setHours(setMinutes(new Date(), 30), 22),
    setHours(setMinutes(new Date(), 0), 23),
    setHours(setMinutes(new Date(), 30), 23),
    setHours(setMinutes(new Date(), 0), 0),
    setHours(setMinutes(new Date(), 30), 0),
    setHours(setMinutes(new Date(), 0), 1),
    setHours(setMinutes(new Date(), 30), 1),
    setHours(setMinutes(new Date(), 0), 2),
    setHours(setMinutes(new Date(), 30), 2),
    setHours(setMinutes(new Date(), 0), 3),
    setHours(setMinutes(new Date(), 30), 3),
    setHours(setMinutes(new Date(), 0), 4),
    setHours(setMinutes(new Date(), 30), 4),
    setHours(setMinutes(new Date(), 0), 5),
    setHours(setMinutes(new Date(), 30), 5),
    setHours(setMinutes(new Date(), 0), 6),
    setHours(setMinutes(new Date(), 30), 6),
    setHours(setMinutes(new Date(), 0), 7),
    setHours(setMinutes(new Date(), 30), 7),
    setHours(setMinutes(new Date(), 0), 8),
    setHours(setMinutes(new Date(), 30), 8),
    ]


    console.log("nowDateTime ", nowDateTime);
    const bookTimeDate = new Date(this.state.queueDetail.book_time).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const bookTime = new Date(this.state.queueDetail.book_time).toLocaleTimeString('th-TH');

    // const time = new Date(this.state.queueDetail.book_time);
    // const timeLeft = setInterval(this.diffTimeCal(time), 1000);

    // console.log(this.diffTimeCal(time));
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // const diffhours = Math.ceil(diffTime / (1000 * 60 * 60));
    // console.log(diffhours + " hours", diffDays + " days");

    console.log("this.props.match.params", this.props.match.params.eiei);
    console.log("this.state.queueDetail: ", this.state.queueDetail);
    return (
      <div className="container">
        <div className="card text-center">
          <div className="card-header">
            {/* {this.state.business_name} */}
            {this.state.queueDetail.business_name}
          </div>
          <div className="card-body">
            <h5 className="card-title">หมายเลขคิวของท่าน : {this.state.queueDetail.queue_no}</h5>
            {this.state.queueDetail.queue_type === "ต่อคิว" ? (
              <>
                <h5 className="card-title">เหลืออีก : {this.state.allQueueWait} คิว</h5>
                <h5 className="card-title">เวลาที่ใช้ในการรอ : {this.state.waitngTime} นาที</h5>
              </>
            ) : (
              <>
                {this.state.showEdit ? (
                  <>
                    <form className="form">
                      {Object.keys(this.state.queueDetail.queueDetail).map((item, i) => (
                        <>
                          {/* {this.state.queueDetail.queueDetail[item]} */}
                          {item === "book_time" ? (
                            <div className="form-inline">
                              <label className="form-inline col-xs-3 col-sm-3 col-md-3" style={{ justifyContent: "left" }}>เวลาในการจอง</label>
                              <div className="customDatePickerWidth">
                                <DatePicker
                                  className="form-control col-xs-9 col-sm-9 col-md-9"
                                  id="book_time"
                                  name="book_time"
                                  selected={this.state.startDate}
                                  placeholderText="เลือกวันเวลาที่ต้องการจอง"
                                  onChange={date => this.setBook_time(date)}
                                  style={{ marginBottom: "10px" }}
                                  showTimeSelect
                                  filterDate={this.isPassDate}
                                  excludeTimes={listWithFilterByDate.length === 0 ? initialFilterByDate.concat(closeTimeList) : listWithFilterByDate.concat(closeTimeList)}
                                  dateFormat="yyyy-MM-dd hh:mm aa"
                                  filterTime={this.filterPassedTime}
                                  includeDates={[new Date(), addDays(new Date(), 1)]}
                                // highlightDates={[new Date(), addDays(new Date(), 1)]}
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="form-inline">
                              <label className="col-xs-3 col-sm-3 col-md-3 form-label" style={{ justifyContent: "left" }}>{item}
                              </label>
                              <input
                                type="text"
                                className="col-xs-9 col-sm-9 col-md-9 form-control"
                                id={item}
                                name={item}
                                placeholder={(this.state.queueDetail.queueDetail[item])}
                                tabIndex={i += 1}
                                required={item === "รายละเอียด" ? false : true}
                                // onChange={this.onFormChange}
                                // readOnly={item == "ชื่อ-นามสกุล" || item == "เบอร์โทรศัพท์" || item == "Email" ? true : false}
                                readOnly={true}
                                style={{ marginBottom: "10px" }}
                              />
                            </div>
                          )}
                        </>
                      ))}
                    </form>
                    {/* <BookQueueWithLogin storeName={this.state.queueDetail.business_name} branch={this.state.queueDetail.branch} editQueue={true} currentUser={currentUser} /> */}
                  </>
                ) : (
                  <>
                    <h5 className="card-title">วันที่จอง : {bookTimeDate}</h5>
                    <h5 className="card-title">เวลาที่จอง : {bookTime}</h5>
                    <h5 className="card-title">เหลือเวลาอีก : {timer}</h5>
                  </>
                )}

              </>

            )}

            {/* <p className="card-text">คิวของคุณ</p> */}

          </div>

          <div className="card-footer text-muted">
            {currentUser && (
              <>
                {this.state.queueDetail.queue_type === "ต่อคิว" ? (
                  <>
                    <button type="button" className="btn btn-danger" onClick={this.handleShow}>ยกเลิกคิว</button>
                  </>
                ) : (
                  <>
                    {this.state.showEdit ? (
                      <>
                        <button type="button" className="btn btn-success" onClick={this.handleSaveEdit}>บันทึก</button>
                        {" "}
                        <button type="button" className="btn btn-danger" onClick={this.handleClose}>ยกเลิกการแก้ไข</button>
                      </>
                    ) : (
                      <>
                        <button type="button" className="btn btn-warning" onClick={this.handleShowEdit}>แก้ไข</button>
                        {" "}
                        {/* <button type="button" className="btn btn-warning" onClick={this.handleShowAddTime}>ต่อเวลา</button> */}
                        {" "}
                        <button type="button" className="btn btn-danger" onClick={this.handleShow}>ยกเลิกคิว</button>
                      </>
                    )}
                  </>
                )}
              </>
            )}

          </div>
        </div>

        <Modal show={this.state.showAddTime} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ต่อเวลา</Modal.Title>
          </Modal.Header>
          <Modal.Body> ต่อเวลาอีก 5 นาที ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              ปิด
                    </Button>
            <Button variant="warning" onClick={this.handleAddTimeQueue}>
              ต่อเวลา
                    </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>ยืนยันการยกเลิกคิว</Modal.Title>
          </Modal.Header>
          <Modal.Body> ต้องการยกเลิกคิวหรือไม่ ?</Modal.Body>
          {message && (
            <div className="form-group">
              <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                {message}
              </div>
            </div>
          )}
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              ปิด
                    </Button>
            <Button variant="danger" onClick={this.handleCancelQueue}>
              ยกเลิกคิว
                    </Button>
          </Modal.Footer>
        </Modal>

        {/* <Modal show={this.state.showEdit} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>แก้ไขเวลาการจอง</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <BookQueueWithLogin storeName={this.state.queueDetail.business_name} branch={this.state.queueDetail.branch} currentUser={currentUser} />
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              ปิด
                    </Button>
            <Button variant="danger" onClick={""}>
              บันทึก
                    </Button>
          </Modal.Footer>
        </Modal> */}
      </div>

    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    user,
    isLoggedIn,
    message
  };
}
export default connect(mapStateToProps)(CurrentQueue);

// export default CurrentQueue;