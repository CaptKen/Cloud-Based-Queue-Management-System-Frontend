import React, { Component } from "react";
import { Col, Row, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import UserService from "../services/user.service";
import businessService from '../services/business.service';


class UserQueueList extends Component {
  constructor(props) {

    super(props);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.handelSearch = this.handelSearch.bind(this);
    this.state = {
      currentUser: undefined,
      listQueue: [],
      redirect: false,
      username: '',
      businessName: '',
      fileInfos: {},
      timer :''
    };
  }

  componentDidMount() {
    const user = this.props.user;
    console.log("did");
    if (user) {
      this.setState({
        currentUser: user.username,
      });
      console.log("this.state.currentUser", this.state.currentUser);
      UserService.listQueue(user.username).then(
        response => {
          console.log("response.data.listQueue")
          console.log(response.data.listQueue)
          response.data.listQueue.map((item) => (
            console.log("item.business_name ", item),
            
            businessService.getIconImg(item.business_name)
              .then((res) => {
                this.setState({
                  ...this.state,
                  listQueue: response.data.listQueue,
                  fileInfos: {
                    ...this.state.fileInfos,
                    [item.business_name]: res.data[0].url
                  },
                })

              })
              .catch((err) => {
                console.error(err);
              })
          ))
        },
        error => {
          this.setState({
            listQueue:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      )
    }
  }

  handelSearch() {
    console.log(this.state.username);
    UserService.listQueue(this.state.username).then(
      response => {
        console.log("response.data.listQueue");
        console.log(response.data.listQueue);
        response.data.listQueue.map((item) => (
          console.log("item.business_name ", item),
          
          businessService.getIconImg(item.business_name)
            .then((res) => {
              this.setState({
                ...this.state,
                listQueue: response.data.listQueue,
                fileInfos: {
                  ...this.state.fileInfos,
                  [item.business_name]: res.data[0].url
                },
              })

            })
            .catch((err) => {
              console.error(err);
            })
        ))

      },
      error => {
        this.setState({
          listQueue:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    )
  }

  onChangeUsername = (e) => {
    console.log(e.target.value);
    this.setState({
      username: e.target.value,
    });

  }

  handleRedirect = (username, businessName) => {
    console.log("------handleRedirect------");
    console.log(username, businessName);
    console.log("------handleRedirect------");
    this.setState({
      redirect: true,
      username: username,
      businessName: businessName
    })
  }
  convertDate = (book_time) => {
    const date = new Date(book_time).toLocaleDateString().split('/');
    // const date = new Date(book_time).toLocaleDateString('th-TH', {
    //   year: 'numeric',
    //   month: 'long',
    //   day: 'numeric',
    // });
    const time = new Date(book_time).toLocaleTimeString('th-TH');
    return <p>{date[1]+"/"+date[0]+"/"+date[2]} <br/>{time} น.</p>
  }

  diffTimeCal = (a) => {
    console.log(a);
    const diffTime = Math.abs(new Date(a) - new Date());
    const days = Math.floor(diffTime/(1000 * 60 * 60 * 24))%30;
    const mins = Math.floor(diffTime/(1000 * 60))%60;
    const hours = Math.floor(diffTime/(1000 * 60 * 60))%24;
    const str = (days + " ว. " + hours + " ชม. " + mins + " น.");

    // this.setState({
    //   timer: str
    // })
    return str;
  }




  render() {
    const { listQueue, fileInfos, timer } = this.state;
    console.log(timer);
    if (this.state.redirect) {
      return (<Redirect
        to={{
          pathname: "/currentQueue/" + this.state.businessName + "/" + this.state.username,
          state: { business_name: this.state.businessName, username: this.state.username }
        }}
      />)
    }
    var border = {
      webkitBoxShadow: "0px 10px 13px -7px #000000, 0px 5px 10px 3px rgba(0,0,0,0)",
      boxShadow: "0px 10px 13px -7px #000000, 0px 5px 10px 3px rgba(0,0,0,0)",
      border: "2px solid rgba(0,0,0,0.46)",
      borderRadius: "10px",
      height: "auto",
      background: "white",
      alignItems: "center",
      marginBottom: "15px"
    }
    var border2 = {
      overflow: "scroll",
      maxHeight: "61.4vh"
    }
    console.log("listQueue====================", this.state.listQueue)

    return (

      <div className="container align-items-start" >
        {listQueue.length > 0 ? (
          <div>
            <h1 className="h3" style={{ padding: "10px" }}>รายการคิวของท่าน</h1><br />
            <Container style={border2} className="text-center">
              {listQueue.map((item, i) => {
                return (
                  <Row sm md lg className="text-center" style={{ padding: "10px", }, border} key={i}>
                    <Col sm md style={{ marginLeft: "5%" }}>
                      <img
                        // className="img-responsive w-100"
                        style={{ display: "initial" ,height:"150px", width:"auto"}}
                        src={fileInfos.[item.business_name]}
                        alt={item.business_name+"'s Icon"}
                      />
                    </Col>

                    <Col sm md style={{ borderRight: "2px solid rgba(0,0,0,0.46)", padding: "15px" }}>
                      <h2>สถานที่</h2>
                      <p>{item.business_name}</p>
                    </Col>

                    <Col sm md style={{ borderRight: "2px solid rgba(0,0,0,0.46)", padding: "15px" }}>
                      <h2>หมายเลขคิว</h2>
                      <p>{item.queue_no}</p>
                    </Col>
                    {item.queue_type === "NOR" ? (
                      <>
                        <Col sm md style={{ borderRight: "2px solid rgba(0,0,0,0.46)", padding: "15px" }}>
                          <h2>คิวที่เหลือ</h2>
                          <p>{item.wait_left}</p>
                        </Col>
                      </>
                    ) : (
                        <>
                          <Col sm md style={{ borderRight: "2px solid rgba(0,0,0,0.46)", padding: "15px" }}>
                            <h2>วันและเวลาที่จอง</h2>
                            <p>{this.convertDate(item.book_time)}</p>
                          </Col>
                          <Col sm md style={{ borderRight: "2px solid rgba(0,0,0,0.46)", padding: "15px" }}>
                          <h2>เหลือเวลา</h2>
                          <p>{this.diffTimeCal(item.book_time)}</p>
                        </Col>
                        </>
                      )}


                    <Col sm md style={{ padding: "15px" }}>
                      <button type="button" className="btn btn-info btn-lg" onClick={() => this.handleRedirect(item.username, item.business_name)} >รายละเอียด</button>
                    </Col>
                  </Row>
                )
              })}
            </Container>
          </div>
        ) : (
            <form>
              <div className="form-group text-center">
                <label className="h1" for="username">เช็คคิวของท่าน</label>
                <div className="col-8" style={{ display: "inline-flex" }}>
                  <input type="text" className="form-control form-control-lg" id="username" placeholder="กรุณากรอกชื่อที่ทำการจอง" onChange={this.onChangeUsername} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }} />
                  <button type="button" className="btn btn-primary mb-2 btn-lg" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} onClick={this.handelSearch}>เช็ค</button>
                </div>
              </div>
            </form>
          )}
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(UserQueueList);