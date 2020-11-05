import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CurrentQueue extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: this.props.location.state.name != undefined ? this.props.location.state.name : '',
          userQueue:'',
          waitingQueue:''
        };
      }
    
        componentWillMount() {
            console.log("name " + this.props.location.state.name);
            axios.post('/QueueByName2', this.state.name)
          .then((res) => {
              console.log(res);
              console.log(res.data);
            this.setState({
                queueDetail: res.data,
                userQueue: res.data.userQueue,
                waitingQueue: res.data.waitingQueue
              });
              console.log("waitingQueue " + this.state.waitingQueue);

        })
        .catch((err) => {
            console.log(err);
        })
        }
    render() {
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-header">
                    ชื่อร้านอาหาร
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">ปัจจุบันคิวที่</h5>
                        <p className="card-text">คิวของคุณ</p>
                        <button type="button" className="btn btn-danger">ยกเลิกคิว</button>
                    </div>
                    <div className="card-footer text-muted">
                        footer
                    </div>
                </div>
            </div>

        );
    }
}
export default CurrentQueue;