import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from '../services/user.service';
import { Modal, Button } from "react-bootstrap";
import { clearMessage } from "../actions/message";
// import { cancelQueue } from "../actions/userQueue";

class CurrentQueue extends Component {
  constructor(props) {
    super(props);
    this.handleCancelQueue = this.handleCancelQueue.bind(this);
    this.state = {
      show: false,
      queueDetail: '',
      business_name: '',
      waitngTime: '',
      allQueueWait: '',
      username: '',
      cancelSuccessful: false,
      redirect: false,
      time: new Date(),
      timer :''
    };
  }

  componentDidMount() {
    const { time } = this.state;
    
    const { history } = this.props;
    console.log(this.state.redirect == false);
    const storeName = this.props.match.params.businessName;
    // const username = this.props.match.params.username;
    if (this.props.location.state == undefined || this.props.location.state == null || this.props.location.state == '' || this.props.match.params.businessName == undefined || this.props.match.params.username == undefined) {
      history.push("/home");
    } else {
      const username = this.props.location.state.username;
      const business_name = this.props.location.state.business_name;

      UserService.getQueueDetail(storeName, username).then(
        response => {
          
          console.log("response.data.QueueDetail", response.data.QueueDetail.userQueueDetail[0].book_time);
          const timer = this.diffTimeCal(new Date(response.data.QueueDetail.userQueueDetail[0].book_time));
          this.setState({
            queueDetail: response.data.QueueDetail.userQueueDetail[0],
            business_name: business_name,
            username: username,
            allQueueWait: response.data.QueueDetail.allQueueWait,
            waitngTime: response.data.QueueDetail.wait_time,
            time: new Date(response.data.QueueDetail.userQueueDetail[0].book_time)
          })
          this.interval = setInterval(() => {
            const diffTime = Math.abs(new Date(response.data.QueueDetail.userQueueDetail[0].book_time) - new Date());
          const days = Math.floor(diffTime/(1000 * 60 * 60 * 24))%30;
          const mins = Math.floor(diffTime/(1000 * 60))%60;
          const hours = Math.floor(diffTime/(1000 * 60 * 60))%24;
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

  handleClose = (e) => {
    this.setState({
      show: false,
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

  diffTimeCal = (a) => {
    const diffTime = Math.abs(a - new Date());
    const days = Math.floor(diffTime/(1000 * 60 * 60 * 24))%30;
    const mins = Math.floor(diffTime/(1000 * 60))%60;
    const hours = Math.floor(diffTime/(1000 * 60 * 60))%24;
    const str = (days + " วัน " + hours + " ชั่วโมง " + mins + " นาที");

    this.setState({
      timer: str
    })
  }

  render() {
    const { message } = this.props;
    const storeName = this.props.match.params.businessName;
    const nowDateTime = new Date();
    const {timer} = this.state;


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

    return (
      <div className="container">
        <div className="card text-center">
          <div className="card-header">
            {/* {this.state.business_name} */}
            {this.state.queueDetail.business_name}
          </div>
          <div className="card-body">
            <h5 className="card-title">หมายเลขคิวของท่าน : {this.state.queueDetail.queue_no}</h5>
            {this.state.queueDetail.queue_type === "NOR" ? (
              <>
                <h5 className="card-title">เหลืออีก : {this.state.allQueueWait} คิว</h5>

              </>
            ) : (
                <>
                  <h5 className="card-title">วันที่จอง : {bookTimeDate}</h5>
                  <h5 className="card-title">เวลาที่จอง : {bookTime}</h5>
                  {/* <h5 className="card-title">เวลาที่ใช้ในการรอ : {this.state.waitngTime} นาที</h5> */}
                </>

              )}
            <h5 className="card-title">เหลือเวลาอีก : {timer}</h5>
            {/* <p className="card-text">คิวของคุณ</p> */}

          </div>
          <div className="card-footer text-muted">
            <button type="button" className="btn btn-danger" onClick={this.handleShow}>ยกเลิกคิว</button>
          </div>
        </div>

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