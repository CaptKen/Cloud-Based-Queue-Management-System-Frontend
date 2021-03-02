import React, { Component } from "react";
import businessService from '../services/business.service';
import UserService from "../services/user.service";
import Carousel from 'react-bootstrap/Carousel'
import AutoPlayCarousel from './PlaceList';
import AD1 from '../statics/advertising/1.jpg'
import AD2 from '../statics/advertising/2.jpg'
import AD3 from '../statics/advertising/3.jpg'
import SeachBar from "./SeachBar";



export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      listByCategory: [],
      fileInfos: {}
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

    this.callAPI();
  }

  callAPI() {
    businessService.findByCategoryName("ร้านอาหาร")
      .then((res) => {
        console.log(res.data.listByCategory);
        this.setState({
          listByCategory: res.data.listByCategory
        })
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render() {
    return (
      // <div className="container">
      //   {/* <header className="jumbotron">
      //     <h3>{this.state.content}</h3>
      //   </header> */}

      // </div>


      <div>
        <SeachBar/>
        <Carousel className="pt-5">
          <Carousel.Item interval={1000}>
            <img
              className="img-responsive"
              src={AD1}
              alt="First slide"
              width="100%"
            />
            <Carousel.Caption>
              <h3>โฆษณา</h3>
              <p>โปรโมชั่น</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img
              className="img-responsive"
              src={AD2}
              alt="First slide"
              width="100%"
            />
            <Carousel.Caption>
              <h3>โฆษณา</h3>
              <p>โปรโมชั่น</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-responsive"
              src={AD3}
              alt="First slide"
              width="100%"
            />
            <Carousel.Caption>
              <h3>โฆษณา</h3>
              <p>โปรโมชั่น</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <AutoPlayCarousel typeName="ร้านอาหาร" data={this.state.listByCategory}/>
        <AutoPlayCarousel typeName="อาคาร" />



      </div>

    );
  }
}


