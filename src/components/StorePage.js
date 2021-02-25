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
        <div>
          <h1 style={{fontSize : "150%"}}>
          IT Restuarant @ king mongkut's institute of technology ladkrabang
          </h1>
          <h2 style={{fontStyle: "oblique", paddingBottom:"2%"}}>
              ร้านอาหาร | ลาดกระบัง | กรุงเทพ
          </h2>
        </div>
      <div className="row" style={{paddingBottom:'2%'}}>
        <div className="col-md-7">
        <Carousel style={{ margin: 5 }} >
          {!fileInfos.length == 0 ? (
            fileInfos.map((item) => (
            <Carousel.Item interval={1000} style={{ borderRadius: "4px" }}>
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
              <p>waiting for manager to setup promotion in store's manage page</p>
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
          </div>
          <div className="col-md-5 card-body" style={{background: "#f9f9f9", borderRadius: "4px", boxShadow: "1px 1px #E8E8E8" }}>
          <GetQueueHeader storeName={storeName} branch={branch}/>
          </div>
        </div>
        <div style= {{background: "#f9f9f9", padding :"3%", boxShadow: "1px 1px #E8E8E8"}}>
          
          <h1 style={{fontSize: "70px"}}>
            ข้อมูลร้าน
          </h1>
          <p1>
            loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus!
          </p1>

          <h1 style={{fontSize: "70px"}}>
            ข้อมูลร้าน22
          </h1>
          <p1>
            loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta 
            minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum 
            alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore 
            doloribus!loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Qui 
            dicta minus molestiae vel beatae natus eveniet ratione temporibus aperiam harum 
            alias officiis assumenda officia quibusdam deleniti eos cupiditate dolore doloribus
            !loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Qui dicta minus molestiae
             vel beatae natus eveniet ratione temporibus aperiam harum alias officiis assumenda officia 
             quibusdam deleniti eos cupiditate dolore doloribus!
          </p1>
          
            <div>
            <AutoPlayCarousel typeName="ร้านอาหาร" data={this.state.listByCategory}/>
            </div>
        </div>
        {/* <AutoPlayCarousel typeName="ร้านอื่นๆ"/> */}
      </div>
    );
  }
}

export default StorePage;




