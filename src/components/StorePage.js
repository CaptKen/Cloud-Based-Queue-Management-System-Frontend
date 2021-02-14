import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import GetQueueHeader from './GetQueueHeader';
import { Container } from 'react-bootstrap';
import AutoPlayCarousel from './PlaceList';
import businessService from '../services/business.service';

import IMG1 from '../statics/business adv/comingSoon.png'

class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileInfos:[]
    };

  }

  componentDidMount(){
    const storeName = this.props.match.params.businessName;
    businessService.getPromotionImg(storeName).then((response) => {
      console.log(response.data);
      this.setState({
        fileInfos: response.data,
      });
    });
  }

  render() {
    const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;
    const { fileInfos } = this.state;
    return (
      <div>
        <GetQueueHeader storeName={storeName} branch={branch}/>
        <Carousel style={{ margin: 50 }} >
          {!fileInfos.length == 0 ? (
            fileInfos.map((item) => (
            <Carousel.Item interval={1000} style={{ borderRadius: "15px" }}>
            <img
              className="img-responsive w-100"
              src={item.url}
              alt={item.name +"'slide"}
              style={{height: "500px"}}
            />
          </Carousel.Item>
          ))):(
            <Carousel.Item style={{ borderRadius: "15px" }}>
            <img
              className="img-responsive w-100"
              src={IMG1}
              alt="No promo slide"
              style={{height: "500px"}}
            />
            <Carousel.Caption>
              <h3>Store is under Construction</h3>
              <p>waiting for manager to setup in store's manage page</p>
            </Carousel.Caption>
          </Carousel.Item>
          )}
          
          {/* <Carousel.Item interval={1000} style={{ borderRadius: "15px" }}>
            <img
              className="img-responsive"
              src={IMG1}
              alt="First slide"
              width="100%"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Descriptions</p>
            </Carousel.Caption>
          </Carousel.Item> */}
          {/* <Carousel.Item interval={500}>
            <img
              className="img-responsive"
              src={IMG2}
              alt="First slide"
              width="100%"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Descriptions</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="img-responsive"
              src={IMG3}
              alt="First slide"
              width="100%"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Descriptions</p>
            </Carousel.Caption>
          </Carousel.Item> */}
        </Carousel>

        {/* <AutoPlayCarousel typeName="ร้านอื่นๆ"/> */}
      </div>
    );
  }
}

export default StorePage;