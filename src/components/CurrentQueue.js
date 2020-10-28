import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CurrentQueue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.location.state.name ? this.props.location.state.name : '',
            user: []

        };
    }

    componentWillMount() {
        axios.post("/QueueByName", this.state.username)
            .then((res) => {
                this.setState({ user: res.data })
                console.log(user);
            })
    }
    render() {
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-header">
                        คิวปัจจุบัน
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