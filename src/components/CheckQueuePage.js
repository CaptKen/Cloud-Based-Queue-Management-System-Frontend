import React, { Component } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserQueueList from './UserQueueList'
import UserService from '../services/user.service';
import { connect } from "react-redux";

class CheckQueuePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUser: undefined,
          };
    }

    componentDidMount(){
        const user = this.props.user;

        if (user) {
        this.setState({
            currentUser: user,
        });
        // UserService.listQueue(user.username).then(
        //     response => {
        //         console.log("inpage");
        //         console.log(response.data.listQueue);
        //     },
        //     error => {
        //         this.setState({
        //           content:
        //             (error.response &&
        //               error.response.data &&
        //               error.response.data.message) ||
        //             error.message ||
        //             error.toString()
        //         });
        //       }
        // );
        }
        
    }
        

    render() {
        const { currentUser } = this.state;
        return (
                <div className="container align-items-start">
                    {
                currentUser ? (
                    <UserQueueList username={currentUser.username}/>
                ):(
                    <div>
                        <form>
                            <div className="form-group text-center">
                                <label className="h1" for="username">เช็คคิวของท่าน</label>
                                <div className="col-8" style={{display: "inline-flex"}}>
                                    <input type="text" className="form-control form-control-lg" id="username" placeholder="กรุณากรอกชื่อที่ทำการจอง" style={{borderTopRightRadius:0, borderBottomRightRadius:0}}/>
                                    <button type="submit" className="btn btn-primary mb-2 btn-lg" style={{borderTopLeftRadius:0, borderBottomLeftRadius:0}}>เช็ค</button>
                                </div>
                            </div>
                </form>
                <UserQueueList/>
                    </div>
                )
            }
                
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
  
  export default connect(mapStateToProps)(CheckQueuePage);
