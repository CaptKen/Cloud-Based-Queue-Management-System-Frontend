import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("token")
    }
    render() {
        return (
            <div>
                <h1>You are Logout</h1>
                <Link to="/">login again</Link>
            </div>
        );
    }
}

export default Logout;