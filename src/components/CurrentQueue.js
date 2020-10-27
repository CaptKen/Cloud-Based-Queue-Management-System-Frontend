import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CurrentQueue extends Component {
    
        componentWillMount() {
            axios.post('/check', "Aisoon")
          .then((res) => {
            console.log("res" + res.data);
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