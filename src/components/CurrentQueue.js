import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import UserService from '../services/user.service';

class CurrentQueue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queueDetail:'',
            business_name:'',
            waitngTime: '',
            currentQueue: ''
        };
      }
    
    componentDidMount(){
        const username = this.props.location.state.username;
        const business_name = this.props.location.state.business_name;

        UserService.getQueueDetail(business_name, username).then(
            response => {
                console.log(response.data.QueueDetail);
                this.setState({
                    queueDetail: response.data.QueueDetail.userQueueDetail[0],
                    business_name: business_name,
                    currentQueue: response.data.QueueDetail.curent_Queue,
                    waitngTime: response.data.QueueDetail.wait_time
                })
                
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

    render() {
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-header">
                    {this.state.business_name}
                    </div>
                    <div className="card-body">
        <h5 className="card-title">หมายเลขคิวของท่าน : {this.state.queueDetail.queue_no}</h5>
        <h5 className="card-title">เหลืออีก : {this.state.currentQueue} คิว</h5>
        <h5 className="card-title">เวลาที่ใช้ในการรอ : {this.state.waitngTime} นาที</h5>
                        {/* <p className="card-text">คิวของคุณ</p> */}
                        
                    </div>
                    <div className="card-footer text-muted">
                        <button type="button" className="btn btn-danger">ยกเลิกคิว</button>
                    </div>
                </div>
            </div>

        );
    }
}
// function mapStateToProps(state) {
//     const { user } = state.auth;
//     return {
//       user,
//     };
//   }
// export default connect(mapStateToProps)(CurrentQueue);

export default CurrentQueue;