import React, { Component } from 'react';
import userService from '../services/user.service';
import ManageQueueTable from './ManageQueueTable';
import { Modal, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { clearMessage } from "../actions/message";
import { connect } from "react-redux";
import ManageQueueTableV2 from './ManageQueueTableV2';

class NextQueueDetail extends Component {
    constructor(props) {
        super(props);
        this.handleAcceptCurrentQueue = this.handleAcceptCurrentQueue.bind(this)
        this.handleCancelQueue = this.handleCancelQueue.bind(this);
        this.state = {
            apiResponse: [],
            currentQueueDetailRes: {},
            queueDetail: {},
            accept: false
        };
    }
    callAPI = () => {
        const storeName = this.props.match.params.businessName;
        const branch = this.props.match.params.branch;
        userService.allQueueOfBusiness(storeName).then(
            res => {
                console.log("res ", res.data.length);
                if (res.data.length !== 0) {
                    console.log("data: ", res.data);
                    userService.currentQueueDetail(storeName).then(
                        response => {
                            console.log(response);
                            console.log(response.data.currentQueueDetail.length);
                            if (response.data.currentQueueDetail.length !== 0) {
                                this.setState({
                                    currentQueueDetailRes: response.data.currentQueueDetail[0],
                                    queueDetail: response.data.currentQueueDetail[0].queueDetail
                                })
                            }else{
                                this.setState({
                                    currentQueueDetailRes: {},
                                    queueDetail: {}
                                })
                            }

                        }
                    )
                }
                this.setState({
                    apiResponse: res.data
                })

            }
        )

    }

    // callAPI = () => {
    //     const storeName = this.props.match.params.businessName;
    //     const branch = this.props.match.params.branch;
    //     userService.allQueueOfBusiness(storeName).then(
    //         res => {
    //             this.setState({
    //                 apiResponse: res.data
    //             })
    //         }
    //     )
    // }

    componentDidMount() {
        this.callAPI();
        console.log(this.state.currentQueueDetailRes);
    }

    handleShowAccept = () => {
        console.log("show accept");
        this.props.dispatch(clearMessage()); // clear message when changing location
        this.setState({
            show: true,
            accept: true,
        });
    };

    handleClose = (e) => {
        this.setState({
            show: false,
            accept: false
        });
    };

    handleShow = () => {
        console.log("show cancel");
        this.props.dispatch(clearMessage()); // clear message when changing location
        this.setState({
            show: true,
        });
    };

    handleCancelQueue(e) {
        console.log(this.state.currentQueueDetailRes);
        e.preventDefault();
        this.setState({
            successful: false,
        });
        userService.cancelQueue(this.state.currentQueueDetailRes.username, this.state.currentQueueDetailRes)
            .then(() => {
                this.setState({
                    show: false,
                    accept: false
                });
                this.callAPI();
                alert("ยกเลิกคิวสำเร็จ")
            })
            .catch(() => {
                this.setState({
                    show: false,
                    accept: false
                });
            });
    }

    handleAcceptCurrentQueue(e) {
        console.log("handleAcceptCurrentQueue---------------------------" + this.state.currentQueueDetailRes);
        e.preventDefault();
        this.setState({
            successful: false,
        });
        userService.acceptCurrentQueue(this.state.currentQueueDetailRes.username, this.state.currentQueueDetailRes)
            .then(() => {
                this.setState({
                    show: false,
                    accept: false
                });
                this.callAPI();
                alert("รับคิวสำเร็จ")
            })
            .catch(() => {
                this.setState({
                    show: false,
                    accept: false
                });
            });

    }

    render() {
        const { message } = this.props;
        const storeName = this.props.match.params.businessName;
        const branch = this.props.match.params.branch;
        const { currentQueueDetailRes, queueDetail } = this.state;
        console.log("this.state.apiResponse", this.state.apiResponse);
        console.log("this.state.currentQueueDetailRes", currentQueueDetailRes === null);
        console.log("queueDetail ", Object.keys(queueDetail).length);

        const queueDetailArray = Object.entries(queueDetail);
        console.log("queueDetailArray: ", queueDetailArray);
        return (
            <div className="container">
                <div>
                    <div>
                        <div className="card text-center">
                            <div className="card-header h1">
                                {storeName}
                            </div>
                            <div className="card-body">
                                {Object.keys(queueDetail).length === 0 ? (
                                    <h1 className="card-title display-4" style={{ opacity: "50%" }}><strong>ไม่มีคิวที่รออยู่</strong></h1>
                                ) : (
                                    <h1 className="card-title display-4"><strong>คิวปัจจุบัน</strong></h1>
                                )}
                                <div style={{ textAlign: "Left", paddingRight: "5%", paddingLeft: "3%", maxHeight: "50vh", overflow: 'auto' }}>
                                    {Object.keys(queueDetail).length !== 0 && (
                                        <>
                                            <h5 className="card-title h3"><strong>หมายเลขคิว</strong> </h5><p className="h4" style={{ textAlign: "Right", borderBottomWidth: "3px", marginBottom: "15px" }} >{this.state.currentQueueDetailRes.queue_no}</p>
                                            <h5 className="card-title h3"><strong>สถานะ</strong></h5><p className="h4" style={{ textAlign: "Right", borderBottomWidth: "3px", marginBottom: "15px" }}>{this.state.currentQueueDetailRes.status}</p>
                                        </>
                                    )}

                                    {queueDetailArray.map(([key, value]) => (
                                        <>
                                            {key === "book_time" ? (
                                                <>
                                                    <p className="card-title h3"><strong>เวลาที่จอง</strong></p>
                                                    <OverlayTrigger
                                                        key={key}
                                                        placement="right"
                                                        overlay={
                                                            <Tooltip id={`tooltip-${value}`}>
                                                                {new Date(value).toLocaleDateString('th-TH')} <br /> {new Date(value).toLocaleTimeString('th-TH')}
                                                            </Tooltip>
                                                        }>
                                                        <p className="h5" style={{ textAlign: "Right", borderBottomWidth: "3px", marginBottom: "15px" }}>{new Date(value).toLocaleDateString('th-TH')} <br /> {new Date(value).toLocaleTimeString('th-TH')}</p>

                                                    </OverlayTrigger>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="card-title h2"><strong>{key}</strong> </p>
                                                    <OverlayTrigger
                                                        placement="right"
                                                        overlay={
                                                            <Tooltip id={`tooltip-${value}`}>
                                                                {value}
                                                            </Tooltip>
                                                        }>
                                                        <p className="h5 text-truncate" style={{ textAlign: "Right", borderBottomWidth: "3px", marginBottom: "15px" }}>{value}</p>
                                                    </OverlayTrigger>
                                                </>
                                            )}
                                        </>
                                    ))}
                                    {/* <p style={{ borderBottomWidth: "3px" }} className="card-title">key {this.state.currentQueueDetailRes.username}</p> */}

                                    <br />
                                </div>
                                {Object.keys(queueDetail).length !== 0 && (
                                    <div>
                                        <button type="button" className="btn btn-success btn-lg" onClick={this.handleShowAccept} >รับคิว</button>
                                        <button type="button" className="btn btn-danger btn-lg" onClick={this.handleShow} style={{ marginLeft: 10 }}>ยกเลิกคิว</button>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>


                <Modal show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.accept ? "ยืนยันการรับคิว ?" : "ยืนยันการยกเลิกคิว"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> {this.state.accept ? "ต้องการเรียกคิวที่ " + this.state.currentQueueDetailRes.queue_no + " ใช่หรือไม่ ?" : "ต้องการยกเลิกคิวที่ " + this.state.currentQueueDetailRes.queue_no + " ใช่หรือไม่ ?"}</Modal.Body>
                    {message && (
                        <div className="form-group">
                            <div className={this.state.successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>ปิด</Button>
                        {this.state.accept ? (
                            <Button variant="success" onClick={this.handleAcceptCurrentQueue}>เรียกคิว</Button>
                        ) : (
                            <Button variant="danger" onClick={this.handleCancelQueue}>ยกเลิกคิว</Button>
                        )}

                    </Modal.Footer>
                </Modal>

                <ManageQueueTable storeName={storeName} data={this.state.apiResponse} />
            </div >
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

export default connect(mapStateToProps)(NextQueueDetail);