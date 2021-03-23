import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import GetQueueHeader from './GetQueueHeader';
import { Container } from 'react-bootstrap';
import AutoPlayCarousel from './PlaceList';
import businessService from '../services/business.service';

import IMG1 from '../statics/business adv/comingSoon.png'
import BusinessLocation from './BusinessLocation';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ border: "5px solid #FF4848", borderRadius: "0px 70px 70px 70px", width: "fit-content", backgroundColor: "#FF4848", paddingInline: "7px" }}>
  <strong><h1 className="h5">{text}</h1></strong>
</div>;

class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileInfos: [],
      businessDetailList: [],
      businessDetail: "",
      address: "",
      telephone: "",
      center: {
        lat: 16.2213,
        lng: 100.96976
      },
      zoom: 15
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
        console.log("res.data", res.data.BusinessDetail[0].lat);
        console.log("businessDetailList000000000 : ", res.data.BusinessDetail[0].businessDetailList);
        // this.setState({
        //   lat: res.data.BusinessDetail[0].lat,
        //   lng: res.data.BusinessDetail[0].lng
        // })
        businessService.getPromotionImg(storeName).then((response) => {
          console.log(response.data);
          this.setState({
            fileInfos: response.data,
            businessDetail: detail[0].text,
            address: address[0].text,
            telephone: telephone[0].text,
            businessDetailList: res.data.BusinessDetail[0].businessDetailList,
            center: {
              lat: res.data.BusinessDetail[0].lat,
              lng: res.data.BusinessDetail[0].lng
            }
          });
        });
      }
    )
  }
  render() {
    const defaultProps = {
      center: {
        lat: this.state.center.lat,
        lng: this.state.center.lng

        // lat: this.state.lat,
        // lng: this.state.lng
      },
      zoom: 15
    };
    const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;
    const { fileInfos, businessDetailList, businessDetail, address, telephone, center } = this.state;
    console.log("1111111111111111", this.state.lat)
    console.log("Center : ", this.props.center, center);
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
        <div className="row" style={{ paddingBottom: '2%', justifyContent: "center" }}>
          <div className="col-md-7" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Carousel style={{ borderRadius: "4px", marginInline: "1%", marginBottom: "2%" }}>
              {!fileInfos.length == 0 ? (
                fileInfos.map((item) => (
                  <Carousel.Item interval={5000} >
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

          <div className="col-md-4 card-body" style={{ background: "#f9f9f9", borderRadius: "15px", boxShadow: "1px 1px #E8E8E8", maxHeight: "500px", marginInline: "1%" }}>
            <GetQueueHeader storeName={storeName} branch={branch} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" style={{ background: "#f9f9f9", borderRadius: "15px", padding: "3%", boxShadow: "1px 1px #E8E8E8" }}>
            <div style={{ paddingBottom: "2%" }}>

              <h1 style={{ fontSize: "40px", paddingBottom: "2%" }}>รายละเอียด</h1>
              <p style={{ textIndent: "50px", maxHeight: "200px", overflowY: "scroll" }}>
                {businessDetail}
              </p>
              <hr />
              <h4 className="text-right" style={{ fontSize: "20px", paddingTop: "2%" }} >เบอร์โทรศัพท์ : {telephone}</h4>
              <h4 className="text-right" style={{ fontSize: "20px", paddingBottom: "2%" }} >ที่อยู่ : {address}</h4>
              <hr />
            </div>
            <div>
              {/* <BusinessLocation lat={this.state.lat} lng={this.state.lng} /> */}
              {/* // Important! Always set the container height explicitly */}
              <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyB39kdWlUdqS-D1uXrcUlRNjjT0U7xUWNU" }}
                  center={this.state.center && this.state.center ? this.state.center : null}
                  defaultZoom={this.state.zoom}
                >
                  <AnyReactComponent
                    lat={this.state.center.lat}
                    lng={this.state.center.lng}
                    text={storeName}
                  />
                </GoogleMapReact>
              </div>
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




