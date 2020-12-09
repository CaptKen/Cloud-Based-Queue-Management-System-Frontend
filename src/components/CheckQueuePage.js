import React, { Component } from 'react';
import { Button, Form, Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserQueueList from './UserQueueList'

class CheckQueuePage extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
                <div className="container align-items-start">
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
        );
    }
}


export default CheckQueuePage;