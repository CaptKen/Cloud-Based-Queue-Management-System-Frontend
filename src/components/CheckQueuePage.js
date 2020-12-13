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
            listQueue:[],
            username:''
          };
    }

    componentDidMount(){
        const user = this.props.user;

        if (user) {
        this.setState({
            currentUser: user.username,
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

    handelSearch(){
        console.log(this.state.username);
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
          });
          
    }
        

    render() {
        const { currentUser } = this.state;
        console.log("currentUser", currentUser);
        return (
                <div className="container align-items-start">
                    {
                currentUser ? (
                    <UserQueueList username={currentUser}/>
                ):(
                    <div>
                        
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
