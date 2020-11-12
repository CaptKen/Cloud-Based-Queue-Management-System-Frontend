import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GetQueueHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
          storeName: this.props.storeName,
          waitingQueue: this.props.waitingQueue
        };
      }
    render() {
        return (
            <div>
                <div className="text-center container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="storeProfile-img-card"
                    />
                    </div>
                    <br/>
                    <div className="col-9" style={{margin: "20px"}}>
                        <div className="row">
                        <h1 className="col-4">ชื่อร้าน : {this.state.storeName}</h1>
                        <h2 className="col-4">จำนวนคิว : {this.state.waitingQueue}</h2>
                        </div>
                    </div>
                    <hr/>
            </div>
        );
    }
}

export default GetQueueHeader;