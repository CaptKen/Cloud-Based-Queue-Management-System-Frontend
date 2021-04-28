import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Container } from 'react-bootstrap';
import userService from '../services/user.service';
import { connect } from "react-redux";


class ShowQueuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      activeItemIndex: 0,
      apiResponse: [],
      currentQueueDetailList: [],
      currentQueue: {},
      queueDetail: {},
      previousQueueDetailList: [],
      previousQueue: {},
      accept: false
    };
  }
  callAPI = () => {
    const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;
    const serviceType = this.props.match.params.serviceType;

    userService.allQueueOfBusiness(storeName).then(
      res => {
        console.log("res ", res.data.length);
        if (res.data.length !== 0) {
          console.log("datas: ", res.data);
          userService.doneAndInprocessQueueDetail(storeName).then(
            response => {
              console.log("33333333", response);
              console.log(response.data.currentQueueDetail.length);
              if (response.data.currentQueueDetail.length !== 0) {
                this.setState({
                  previousQueueDetailList: response.data.currentQueueDetail.slice(0, -1),
                  queueDetail: response.data.currentQueueDetail[0].queueDetail
                })
              } else {
                this.setState({
                  currentQueueDetailList: {},
                  queueDetail: {}
                })
              }

            }
          )

          userService.findShowCurentQueueDetail(storeName).then(
            response => {
              console.log("33333333", response);
              console.log(response.data.showCurrentQueueDetail.length);
              if (response.data.showCurrentQueueDetail.length !== 0) {
                this.setState({
                  previousQueue: response.data.showCurrentQueueDetail[0],
                })
              } else {
                this.setState({
                  currentQueueDetailList: {},
                  queueDetail: {}
                })
              }

            }
          )

          userService.curentQueueDetailForShowPage(storeName).then(
            response => {
              console.log("22222222222", response);
              console.log(response.data.currentQueueDetail.length);
              if (response.data.currentQueueDetail.length !== 0) {
                this.setState({
                  currentQueueDetailList: response.data.currentQueueDetail,
                  currentQueue: response.data.currentQueueDetail[0],
                  queueDetail: response.data.currentQueueDetail[0].queueDetail
                })
              } else {
                this.setState({
                  currentQueueDetailList: {},
                  queueDetail: {}
                })
              }

            }
          )
        }
        this.setState({
          apiResponse: res.data
        })

      }
    )

  }
  componentDidMount() {
    this.callAPI();
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    console.log("11111111111111111111111111", this.state.currentQueueDetailList)
    console.log("previous", this.state.previousQueueDetailList)
    const storeName = this.props.match.params.businessName;
    const branch = this.props.match.params.branch;
    const { currentUser, rightChevron, leftChevron } = this.state;

    return (
      <div style={{ marginInline: "2%", maxHeight: "85vh" }}>
        <div className="row" style={{ margin: "auto" }}>
          <div className="col-md-9">

            <div class="card text-center">
              <div class="card-header">
                <h1 className="h1">ชื่อร้าน</h1>
              </div>
              <div class="card-body">
                <h1 className="h1">หมายเลขคิว</h1>
                <p className="display-1">{this.state.previousQueue.queue_no}</p>
                <h2 className="h2">เชิญที่ช่องบริการ</h2>
                <p className="display-3">{this.state.previousQueue.service_no}</p>
              </div>
            </div>

            <h1 className="h2 ml-5">คิวถัดไป</h1>

            {this.state.currentQueueDetailList.length ? (
              <div className="text-center" style={{ borderWidth: "1px", paddingInline: "30px" }}>
                <ItemsCarousel
                  requestToChangeActive={this.onChange}
                  activeItemIndex={this.state.activeItemIndex}
                  numberOfCards={4}
                  gutter={20}
                  leftChevron={<i class="fas fa-angle-left"></i>}
                  rightChevron={<i class="fas fa-angle-right"></i>}
                  outsideChevron
                  chevronWidth={30}
                  alwaysShowChevrons={true}
                >
                  {this.state.currentQueueDetailList.map((item) => {
                    return <div>
                      <div className="card" style={{ marginTop: "4%", marginLeft: "1%" }}>
                        <div class="card-body">
                          <h1 className="card-title">หมายเลขคิว</h1>
                          <p className="display-4 card-text">{item.queue_no}</p>
                        </div>
                      </div>
                    </div>

                  })}
                </ItemsCarousel>
              </div>
            ) : (
              <div style={{ textAlign: "center", fontSize: "150%" }}>
                <h1>
                  ไม่มีคิวถัดไป
                    </h1>
              </div>
            )}





          </div>
          <div className="col-md-3">
            <h1 className="h2 mt-3">คิวที่เรียกไปแล้ว</h1>

            {this.state.previousQueueDetailList.length ? (
              <div style={{ borderWidth: "1px", maxHeight: "80vh", overflowY: "scroll", overflowX: 'hidden' }}>
                <div className="row d-flex flex-column" style={{ alignContent: "center" }}>
                  <div className="col-md-10">
                    <div className="card">
                      <div className="row">
                        <div className="col">
                          <div class="card-body text-center">
                            {this.state.previousQueueDetailList.map((item) => {
                              return <div>
                                <p className="display-3 card-text">{item.queue_no}</p>
                              </div>
                            })}
                          </div>

                        </div>
                      </div>

                      <div className="col">
                        <div class="card-body text-center">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", fontSize: "150%", marginTop: "10%" }}>
                <p1>ไม่มีคิวที่เรียกไปแล้ว</p1>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    user,
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(ShowQueuePage);
