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
      fileInfos: [],
      businessDetailList: [],
      businessDetail: "",
      address: "",
      telephone: ""
    };

  }

  componentDidMount() {
    const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;


    businessService.getBusinessDetail(storeName, branch).then(
      res => {
        const detail = res.data.BusinessDetail[0].businessDetailList.filter(function (item) {
          return item.name === "รายละเอียด"
        })

        const address = res.data.BusinessDetail[0].businessDetailList.filter(function (item) {
          return item.name === "ที่อยู่"
        })

        const telephone = res.data.BusinessDetail[0].businessDetailList.filter(function (item) {
          return item.name === "เบอร์ติดต่อ"
        })

        console.log("detail ", detail[0].text);
        console.log("businessDetailList : ", res.data.BusinessDetail[0].businessDetailList);
        businessService.getPromotionImg(storeName).then((response) => {
          console.log(response.data);
          this.setState({
            fileInfos: response.data,
            businessDetail: detail[0].text,
            address: address[0].text,
            telephone: telephone[0].text,
            businessDetailList: res.data.BusinessDetail[0].businessDetailList,
          });
        });
      }
    )
  }

  render() {
    const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;
    const { fileInfos, businessDetailList, businessDetail, address, telephone } = this.state;


    console.log("businessDetail: ", businessDetail);
    return (
      <div className="container">
        <div>
          <h1 style={{ fontSize: "150%" }}>
            {storeName}
          </h1>
          <h2 style={{ fontStyle: "oblique", paddingBottom: "2%" }}>
            @ {branch}
          </h2>
        </div>
        <div className="row" style={{ paddingBottom: '2%', justifyContent: "center"}}>
          <div className="col-md-7" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Carousel style={{ borderRadius: "4px", marginInline: "1%", marginBottom: "2%" }}>
              {!fileInfos.length == 0 ? (
                fileInfos.map((item) => (
                  <Carousel.Item interval={1000} >
                    <img
                      className="img-responsive w-100"
                      src={item.url}
                      alt={item.name + "'slide"}
                      style={{ height: "500px" }}
                    />
                  </Carousel.Item>
                ))) : (
                  <Carousel.Item >
                    <img
                      className="img-responsive w-100"
                      src={IMG1}
                      alt="No promo slide"
                      style={{ height: "500px" }}
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
            </Carousel>
          </div>
          
          <div className="col-md-4 card-body" style={{ background: "#f9f9f9", borderRadius: "15px", boxShadow: "1px 1px #E8E8E8", maxHeight: "500px", marginInline: "1%"}}>
            <GetQueueHeader storeName={storeName} branch={branch} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" style={{ background: "#f9f9f9", borderRadius: "15px", padding: "3%", boxShadow: "1px 1px #E8E8E8" }}>
            <div style={{ paddingBottom: "2%" }}>
            
              <h1 style={{ fontSize: "40px", paddingBottom: "2%" }}>รายละเอียด</h1>
              <p style={{ textIndent: "50px", maxHeight: "200px" , overflowY: "scroll" }}>
                {businessDetail}
                </p>
                <hr/>
                <h4 className="text-right" style={{ fontSize: "20px", paddingTop: "2%"}} >เบอร์โทรศัพท์ : {telephone}</h4>
                <h4 className="text-right" style={{ fontSize: "20px", paddingBottom: "2%" }} >ที่อยู่ : {address}</h4>
                <hr/>
            </div>

              <div>
                <AutoPlayCarousel typeName="ร้านอาหาร" data={this.state.listByCategory} />
              </div>
            </div>
          </div>

          {/* <AutoPlayCarousel typeName="ร้านอื่นๆ"/> */}
        </div>
    );
  }
}

export default StorePage;




