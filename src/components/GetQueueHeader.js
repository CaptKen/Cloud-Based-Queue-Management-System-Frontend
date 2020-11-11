import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GetQueueHeader extends Component {
    render() {
        return (
            <div>
                <div style={{textAlign:"center"}}>
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="storeProfile-img-card"
                    />
                    </div>
                    <hr/>
                    <br/>
                    <div style={{marginLeft: "20%"}}>
                        <h1>ชื่อร้าน : testtttttttttttttttttttttttttttttttttttttttt</h1>
                        <br/>
                        <h2>จำนวนคิว : 20</h2>
                    </div>
                    <br/>
                    <hr/>
            </div>
        );
    }
}

export default GetQueueHeader;