import React, { Component, Fragment } from 'react';
import axios from 'axios';
import userService from '../services/user.service';
import ManageQueueTable from './ManageQueueTable';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: [],
            currentQueueDetailRes: []
        };
    }
    callAPI = () => {
        userService.allQueueOfBusiness("BurinLKB").then(
            res => {
                this.setState({
                    apiResponse: res.data
                })


            }
        )

        userService.currentQueueDetail("BurinLKB").then(
            response => {
                this.setState({
                    currentQueueDetailRes: response.data.currentQueueDetail[0]
                })
            }
        )
    }

    componentDidMount() {
        this.callAPI();
        console.log(this.state.currentQueueDetailRes);
    }
    render() {
        console.log("this.state.apiResponse", this.state.apiResponse);
        console.log("this.state.currentQueueDetailRes", this.state.currentQueueDetailRes);
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-header h1">
                        BurinLKB
                    </div>
                    <div className="card-body">
                        <h1 className="card-title h3">คิวปัจจุบัน</h1>
                        <div style={{ textAlignLast: "justify", paddingLeft: "100px", paddingRight: "100px" }}>
                            <h5 style={{ borderBottomWidth: "3px" }} className="card-title">หมายเลขคิว {this.state.currentQueueDetailRes.queue_no}</h5>
                            <p style={{ borderBottomWidth: "3px" }} className="card-title">ชื่อผู้ใช้บริการ {this.state.currentQueueDetailRes.username}</p>
                            <p style={{ borderBottomWidth: "3px" }} className="card-title">รายละเอียดเพิ่มเติม {this.state.currentQueueDetailRes.user_detail}</p>
                            <p style={{ borderBottomWidth: "3px" }} className="card-title">สถานะ {this.state.currentQueueDetailRes.status}</p>
                            <br />
                        </div>
                        <div>
                            <button type="button" className="btn btn-success">รับคิว</button>
                            <button type="button" className="btn btn-danger" style={{
                                marginLeft: 10
                            }}>ยกเลิกคิว</button>
                        </div>
                    </div>
                </div>
                <ManageQueueTable data={this.state.apiResponse} />
                {/* <br />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.apiResponse.map((item, i) => {
                            return(
                                <Fragment>
                                    <tr key={i}>
                                        <th scope="row">{item.id}</th>
                            <td>{item.name}</td>
                            <td>Otto</td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-success">รับคิว</button>
                                    <button type="button" className="btn btn-danger" style={{
                                        marginLeft: 10
                                    }}>ยกเลิกคิว</button>
                                </div>
                            </td>
                                    </tr>
                                </Fragment>
                            )
                        })}
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-success">รับคิว</button>
                                    <button type="button" className="btn btn-danger" style={{
                                        marginLeft: 10
                                    }}>ยกเลิกคิว</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-success">รับคิว</button>
                                    <button type="button" className="btn btn-danger" style={{
                                        marginLeft: 10
                                    }}>ยกเลิกคิว</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>
                                <div>
                                    <button type="button" className="btn btn-success">รับคิว</button>
                                    <button type="button" className="btn btn-danger" style={{
                                        marginLeft: 10
                                    }}>ยกเลิกคิว</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        );
    }
}

export default Admin;