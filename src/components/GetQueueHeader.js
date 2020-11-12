import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {Container, Row, Col, Media} from 'react-bootstrap'

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
                <Media style={{marginTop:"100px"}}>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="storeProfile-img-card mr-5"
                    
                />
                <Media.Body style={{marginTop:"75px", marginLeft:"20px"}}>
                    <h5>ชื่อร้าน : {this.state.storeName}</h5>
                    <br/>
                    <h1>จำนวนคิว : {this.state.waitingQueue}</h1>
                </Media.Body>
                </Media>
                <Container>
                    <Row>
                        <Col>
                           
                        </Col>
                        <Col>
                            <h1></h1>
                            {/* <h1>จำนวนคิว : {this.state.waitingQueue}</h1> */}
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>1 of 3</Col>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                    </Row> */}
                </Container>
                {/* <div className="text-center container">
                    <br/>
                        <div className="row">
                            <div className="col-9" style={{margin: "20px"}}>
                                
                            </div>

                            <div className="col-4">
                                
                            </div>
                    </div>
                    <hr/>
                </div> */}
            </div>
        );
    }
}

export default GetQueueHeader;