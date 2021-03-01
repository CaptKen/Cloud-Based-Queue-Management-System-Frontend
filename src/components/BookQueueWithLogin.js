import React, { Component } from "react";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import UserService from "../services/user.service";
import businessService from '../services/business.service';
import { connect } from "react-redux";
import { addqueue } from "../actions/userQueue"
import DatePicker from 'react-datepicker';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { addDays, subDays } from "date-fns";
import userService from "../services/user.service";

import { clearMessage, setMessage } from "../actions/message";

class BookQueueWithLogin extends Component {
    constructor(props) {
        super(props);
        this.handleAddqueue = this.handleAddqueue.bind(this);
        this.onChangeSerivce = this.onChangeSerivce.bind(this);
        this.state = {
            show: false,
            redirectFlag: false,
            currentUser: undefined,
            successful: false,
            storeName: this.props.storeName,
            branch: this.props.branch,
            isRestaurant: false,
            apiResponse: [],
            serviceList: [],
            selectBookTime:false,
            now: '',
            booked: [],
            listWithFilterByDate: [],
            iiii: 0,
            startDate: null,
            formElements: {
                queue_no: '',
                username: this.props.currentUser.username,
                queue_type: 'BOO',
                status: 'waiting',
                email:this.props.currentUser.email,
                business_name: this.props.storeName,
                book_time: '',
                queueDetail: {}
            }
        };
    }

    componentDidMount() {
        // const user = this.props.user;
        // console.log(user);
        this.setState({
            redirectFlag: false,
            now: this.timeStringConverter(new Date()),
            formElements: {
                ...this.state.formElements,
                username: this.props.currentUser.username,
                business_name: this.props.storeName,
                queue_type: 'BOO',
                status: 'waiting',
                queueDetail: {
                    ["ชื่อ-นามสกุล"]: this.props.currentUser.username,
                    ["เบอร์โทรศัพท์"]: this.props.currentUser.telephone,
                    ["Email"]: this.props.currentUser.email
                }
            }
        });
        console.log("storeName", this.state.storeName);
        console.log("branch", this.state.branch);
        businessService.getBusinessDetail(this.state.storeName, this.state.branch).then(
            res => {
                console.log("apiResponse: " + res.data.BusinessDetail[0].fields);
                this.setState({
                    apiResponse: res.data.BusinessDetail[0].fields,
                    serviceList: res.data.BusinessDetail[0].tableDetail,
                    isRestaurant: (res.data.BusinessDetail[0].categories === "ร้านอาหาร" ? true : false),
                })
            }
        )

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

        // if (user) {
        //   this.setState({
        //     currentUser: user,
        //     formElements: {
        //       name:user.username,
        //       surname:user.username,
        //       email:user.email,
        //     }
        //   });
        // }
    }

    filterByDate = allListBook => {
        let result = this.state.booked.filter((lst) => {
            console.log(lst.getDate() === new Date(allListBook).getDate());
            return lst.getDate() === new Date(allListBook).getDate();
        })
        return result
    }

    onChangeSerivce(e) {
        console.log(e.target.value);
        console.log("e.target ", e.target);
        const value = e.target.value;

        let updateForm = { ...this.state.formElements.queueDetail };
        updateForm['service'] = value;

        this.setState({
            ...this.state,
            formElements: {
                ...this.state.formElements,
                queue_no: value,
                queueDetail: updateForm
            }
        })
    }


    setBook_time = (e) => {
        console.log("datepick(e) ", e);
        console.log('name == "book_time"');

        let updateForm = { ...this.state.formElements.queueDetail };
        updateForm["book_time"] = e;

        let lst = this.filterByDate(e);
        console.log("lst ", lst);
        this.setState({
            startDate: new Date(e),
            listWithFilterByDate: lst,
            selectBookTime:true,
            formElements: {
                ...this.state.formElements,
                book_time: e,
                ...this.state.formElements.queueDetail,
                queueDetail: updateForm
            }
        })
    }

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

        } else if (name == "book_time") {
            console.log('name == "book_time"');
            this.setState({
                ...this.state,
                selectBookTime: true,
                formElements: {
                    ...this.state.formElements,
                    book_time: value,
                    ...this.state.formElements.queueDetail,
                    queueDetail: updateForm
                }
            })
        } else if(name == "Email"){
            console.log('name == "Email"');
            this.setState({
                ...this.state,
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
                ...this.state.formElements.queueDetail,
                queueDetail: updateForm
              }
            })
          }

    }
    handleAddqueue(e) {
        e.preventDefault();
        this.setState({
            successful: false,
        });
        const formData = {};
        for (let name in this.state.formElements) {
            if (name === 'formValid') {
                console.log("formValidformValidformValid");
                continue;
            }
            console.log('name', name);
            formData[name] = this.state.formElements[name];
        }
        console.log("formData", formData);

        const { history } = this.props;
        this.props.dispatch(addqueue(formData))
            .then(() => {
                console.log("in dispatch");
                this.setState({
                    successful: true,
                    redirectFlag: true
                });
            })
            .catch(() => {
                this.setState({
                    successful: false,
                });
            });
    }


    handleClose = (e) => {
        this.setState({
            show: false,
            redirectFlag: false
        });
    };

    handleShow = () => {
        console.log("show");
        this.props.dispatch(clearMessage());
        if (this.state.formElements.username === '') {
            this.props.dispatch(setMessage("กรุณากรอกข้อมูลให้ครบ"));
        }
        this.setState({
            show: true,
        });
    };

    isPassDate = (date) => {
        return subDays(new Date(), 1) < date;
    }

    filterPassedTime = time => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    }

    handleValue = (key) => {
        let value;
        switch (key) {
            case "ชื่อ-นามสกุล":
                return this.state.formElements.username;
            case "Email":
                return this.props.currentUser.email;
            case "เบอร์โทรศัพท์":
                return this.props.currentUser.telephone

            default:
                return ""
                break;
        }
    }

    timeStringConverter = (datetime) => {
        var d = new Date(datetime),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate() + 1),
            year = d.getFullYear(),
            hour = '' + (d.getHours()),
            min = '' + d.getMinutes();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        if (hour.length < 2)
            hour = '0' + hour;
        if (min.length < 2)
            min = '0' + min;
        const nowDateTimeStr = [year, month, day].join('-') + "T" + hour + ":" + min;
        console.log(nowDateTimeStr);
        return nowDateTimeStr;
    }

    render() {
        const { message } = this.props;
        const { currentUser } = this.state;
        const { apiResponse, now, booked, listWithFilterByDate, isRestaurant, serviceList } = this.state;

        // const disableButton = ();
        // console.log("disableButton", disableButton);

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

        console.log("booked ", booked);
        console.log("listWithFilterByDate ", listWithFilterByDate);
        console.log("initialFilterByDate", initialFilterByDate);

        console.log("currentUser", this.props.currentUser);
        console.log("business_name", this.props.storeName);
        if (this.state.redirectFlag) {
            return (<Redirect
                to={{
                    pathname: "/currentQueue/" + this.state.formElements.business_name + "/" + this.state.formElements.username,
                    state: { username: this.state.formElements.username, business_name: this.state.formElements.business_name }
                }}
            />)
        }
        return (
            <div className="container">
                <div className="row d-block">
                    <form id="contact-form" className="form" onSubmit={this.submit} ref={(c) => {
                        this.form = c;
                    }} style={{ margin: "20px" }}>
                        {apiResponse.map((item, i) => (
                            <div className="form-inline">
                                <label className="col-xs-3 col-sm-3 col-md-3 form-inline" style={{ justifyContent: "left" }}>{item}</label>
                                <input
                                    type="text"
                                    className="form-control col-xs-9 col-sm-9 col-md-9"
                                    id={item}
                                    name={item}
                                    placeholder={this.handleValue(item) === "" ? item : this.handleValue(item)}
                                    tabIndex={i += 1}
                                    required={item === "รายละเอียด" ? false : true}
                                    onChange={this.onFormChange}
                                    readOnly={item == "เบอร์โทรศัพท์" || item == "Email" ? true : false}
                                    style={{ marginBottom: "10px" }}
                                />
                            </div>
                        ))}

                        {!isRestaurant && (
                            <div className="form-inline" name="services">
                                <label className="col-xs-3 col-sm-3 col-md-3 form-label" style={{ justifyContent: "left" }} htmlFor="services">ประเภทบริการ</label>
                                <select onChange={this.onChangeSerivce} className="form-control" style={{ marginBottom: "10px" }}>
                                    <option selected value="กรุณาเลือกประเภทบริการ">กรุณาเลือกประเภทบริการ</option>
                                    {serviceList.map((item) => (
                                        console.log("item ", item),
                                        <option name={item.name} value={item.typeSymbol} >{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="form-inline">
                            <label className="form-inline col-xs-3 col-sm-3 col-md-3" style={{ justifyContent: "left" }}>เลือกเวลาในการจอง</label>
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

                        <div className="text-center" style={{ margin: "20px" }}>
                            <Button variant="primary" style={{ marginRight: "2%" }} onClick={this.handleShow}>
                                จองเวลา
                            </Button>

                            <Button variant="danger" onClick={() => window.history.back()}>
                                ย้อนกลับ
                            </Button>
                        </div>

                        <Modal show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>ยืนยันการต่อคิว</Modal.Title>
                            </Modal.Header>
                            <Modal.Body> ต้องการเข้าคิว/ต่อคิวหรือไม่</Modal.Body>
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
                                <Button variant="primary" type="submit" onClick={this.handleAddqueue} disabled={!this.state.selectBookTime}>
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
    // const { user } = state.auth;
    const { message } = state.message;
    return {
        // user,
        message
    };
}

export default connect(mapStateToProps)(BookQueueWithLogin);
