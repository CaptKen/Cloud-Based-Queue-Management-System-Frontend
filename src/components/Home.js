import React, { Component } from "react";

import UserService from "../services/user.service";
import Carousel from 'react-bootstrap/Carousel'
import AutoPlayCarousel from './PlaceList';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      // <div className="container">
      //   {/* <header className="jumbotron">
      //     <h3>{this.state.content}</h3>
      //   </header> */}
        
      // </div>
    

    <div>
      <Carousel style={{marginTop:"75px"}}>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>โฆษณา โปรโมชั่น</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
      <AutoPlayCarousel typeName="ร้านอาหาร"/>
      <AutoPlayCarousel typeName="ร้านอื่นๆ"/>
      <AutoPlayCarousel typeName="ร้านอื่นๆ"/>
      <AutoPlayCarousel typeName="ร้านอื่นๆ"/>


    </div>

    );
  }
}


