import React, { Component } from 'react';
import userService from '../services/user.service';
import ManageQueueTable from './ManageQueueTable';

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: [],
            currentQueueDetailRes: [],
            queueDetail:{}
        };
    }
    callAPI = () => {
        const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;
        userService.allQueueOfBusiness(storeName).then(
            res => {
                
                if (res.data !== []) {
                    console.log("data: ", res.data);
                    userService.currentQueueDetail(storeName).then(
                        response => {
                            this.setState({
                                currentQueueDetailRes: response.data.currentQueueDetail[0],
                                queueDetail: response.data.currentQueueDetail[0].queueDetail
                            })
                        }
                    )   
                }
                this.setState({
                    apiResponse: res.data
                })

            }
        )
        
    }

    componentDidMount() {
        this.callAPI();
        console.log(this.state.currentQueueDetailRes);
    }
    render() {
        const storeName = this.props.match.params.businessName;
        const branch = this.props.match.params.branch;
        const {currentQueueDetailRes, queueDetail} = this.state;
        console.log("this.state.apiResponse", this.state.apiResponse);
        console.log("this.state.currentQueueDetailRes",currentQueueDetailRes);
        console.log("queueDetail ", queueDetail);

        const queueDetailArray = Object.entries(queueDetail);
        console.log("eiei: ", queueDetailArray);
        return (
            <div className="container">
                <div className="card text-center">
                    <div className="card-header h1">
                        {storeName}
                    </div>
                    <div className="card-body">
                        <h1 className="card-title h3">คิวปัจจุบัน</h1>
                        <div style={{textAlign: "Left", paddingLeft: "100px", paddingRight: "100px" }}>
                            <h5 className="card-title h4">หมายเลขคิว </h5><p style={{textAlign:"Right", borderBottomWidth: "3px", marginBottom: "15px"}} >{this.state.currentQueueDetailRes.queue_no}</p>
                            <p className="card-title h4">สถานะ</p><p style={{textAlign:"Right", borderBottomWidth: "3px", marginBottom: "15px"}}>{this.state.currentQueueDetailRes.status}</p>
                            {queueDetailArray.map(([key, value]) => (
                                <>
                                <p className="card-title h4">{key} </p><p style={{textAlign:"Right" ,borderBottomWidth: "3px", marginBottom: "15px"}}>{value}</p> 
                                </>
                                
                            ))}
                            {/* <p style={{ borderBottomWidth: "3px" }} className="card-title">key {this.state.currentQueueDetailRes.username}</p> */}
                           

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
                <ManageQueueTable storeName={storeName} data={this.state.apiResponse} />
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