import React, { Component } from "react";
import {Col, Row, Container } from 'react-bootstrap';
import styled from 'styled-components';
import { Redirect ,useHistory  } from "react-router-dom";
import { connect } from "react-redux";

import UserService from "../services/user.service";


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
      businessName:''
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
        console.log("response.data.listQueue");
        console.log(response.data.listQueue);
        this.setState({
          listQueue: response.data.listQueue,
        }); 

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

  testLog(){
    console.log("test");
  }

  handelSearch(){
    console.log(this.state.username);
    UserService.listQueue(this.state.username).then(
      response => {
        console.log("response.data.listQueue");
        console.log(response.data.listQueue);
        this.setState({
          listQueue: response.data.listQueue,
        }); 

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
      businessName:businessName
    })
  }


  render() {
    if (this.state.redirect) {
      return (<Redirect
      to={{
      pathname: "/currentQueue",
      state: { business_name: this.state.businessName, username: this.state.username }
    }}
  />)
    }
      var border={
            webkitBoxShadow: "0px 10px 13px -7px #000000, 0px 5px 10px 3px rgba(0,0,0,0)", 
            boxShadow: "0px 10px 13px -7px #000000, 0px 5px 10px 3px rgba(0,0,0,0)",
            border: "2px solid rgba(0,0,0,0.46)",
            borderRadius: "10px",
            height: "auto",
            background: "white",
            alignItems: "center",
            marginBottom: "15px"
      }
      var border2={
            overflow:"scroll",
            maxHeight: "61.4vh"
      }
      console.log("listQueue====================",this.state.listQueue)
      
    return (
      
      <div className="container align-items-start" >
        {this.state.listQueue.length > 0  ? (
          <div>
            <h1 className="h3" style={{padding:"10px"}}>รายการคิวของท่าน</h1><br/>
              <Container style={border2} className="text-center">
              {this.state.listQueue.map((item, i) => {
                return(
                  <Row sm md className="text-center" style={{padding:"10px",}, border} key={i}>
                  <Col sm md style={{marginLeft:"5%"}}>
                  <img
                  style={{display:"initial"}}
                  src="data:image/jpeg;base64,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"
                  alt="First slide"
                  />
                  </Col>
                            
                  <Col sm md style={{borderRight: "2px solid rgba(0,0,0,0.46)", padding:"15px"}}>
                      <h2>สถานที่</h2>
                      <p>{item.business_name}</p>
                  </Col>
                            
                  <Col sm md style={{borderRight: "2px solid rgba(0,0,0,0.46)", padding:"15px"}}>
                      <h2>หมายเลขคิว</h2>
                      <p>{item.queue_no}</p>
                  </Col>
                            
                  <Col sm md style={{borderRight: "2px solid rgba(0,0,0,0.46)", padding:"15px"}}>
                      <h2>คิวที่เหลือ</h2>
                      <p>{item.wait_left}</p>
                  </Col>
                            
                  <Col sm md style={{padding:"15px"}}>
                      <button type="button" className="btn btn-info btn-lg" onClick={() => this.handleRedirect(item.username, item.business_name)} >รายละเอียด</button>
                  </Col>
              </Row>
              )
            })}
            </Container>
          </div>
        ):(
          <form>
          <div className="form-group text-center">
            <label className="h1" for="username">เช็คคิวของท่าน</label>
            <div className="col-8" style={{display: "inline-flex"}}>
              <input type="text" className="form-control form-control-lg" id="username" placeholder="กรุณากรอกชื่อที่ทำการจอง" onChange={this.onChangeUsername} style={{borderTopRightRadius:0, borderBottomRightRadius:0}}/>
              <button type="button" className="btn btn-primary mb-2 btn-lg" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0}} onClick={this.handelSearch}>เช็ค</button>
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