import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Container } from 'react-bootstrap';
import userService from '../services/user.service';
import { connect } from "react-redux";
import { getInprocessQueue, getWaitingQueue, findQueueForShowQueuePage } from "../actions/userQueue";

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
      accept: false,
      reloadData: false,
      allQueueDetail: {
        inprocessAndDoneQueue: [],
        inprocessQueue: [],
        waitingQueue:[]
      }
    };
  }
  static reloadTest() {
    this.setState({
      reloadData: true
    })
  }

  callAPI = ()=> {
    const storeName = this.props.match.params.businessName;
    userService.findQueueForShowQueuePage(storeName)
    .then((res) => {
      console.log("res.data : ", res.data);
      this.setState({
        allQueueDetail : res.data
      })
    })
  }
  // callAPI = () => {
  //   const storeName = this.props.match.params.businessName;
  //   const branch = this.props.match.params.branch;
  //   const serviceType = this.props.match.params.serviceType;



  //   userService.allQueueOfBusiness(storeName).then(
  //     res => {
  //       console.log("res ", res.data.length);
  //       if (res.data.length !== 0) {
  //         console.log("datas: ", res.data);
  //         userService.doneAndInprocessQueueDetail(storeName).then(
  //           response => {
  //             console.log("33333333", response);
  //             console.log(response.data.currentQueueDetail.length);
  //             if (response.data.currentQueueDetail.length !== 0) {
  //               this.setState({
  //                 previousQueueDetailList: response.data.currentQueueDetail.slice(0, -1),
  //                 queueDetail: response.data.currentQueueDetail[0].queueDetail
  //               })
  //             } else {
  //               this.setState({
  //                 currentQueueDetailList: {},
  //                 queueDetail: {}
  //               })
  //             }

  //           }
  //         )


  //         userService.findShowCurentQueueDetail(storeName).then(
  //           response => {
  //             console.log("33333333", response);
  //             console.log(response.data.showCurrentQueueDetail.length);
  //             if (response.data.showCurrentQueueDetail.length !== 0) {
  //               this.setState({
  //                 previousQueue: response.data.showCurrentQueueDetail[0],
  //               })
  //             } else {
  //               this.setState({
  //                 currentQueueDetailList: {},
  //                 queueDetail: {}
  //               })
  //             }

  //           }
  //         )

  //         userService.curentQueueDetailForShowPage(storeName).then(
  //           response => {
  //             console.log("22222222222", response);
  //             console.log(response.data.currentQueueDetail.length);
  //             if (response.data.currentQueueDetail.length !== 0) {
  //               this.setState({
  //                 currentQueueDetailList: response.data.currentQueueDetail,
  //                 currentQueue: response.data.currentQueueDetail[0],
  //                 queueDetail: response.data.currentQueueDetail[0].queueDetail
  //               })
  //             } else {
  //               this.setState({
  //                 currentQueueDetailList: {},
  //                 queueDetail: {}
  //               })
  //             }

  //           }
  //         )
  //       }
  //       this.setState({
  //         apiResponse: res.data,
  //         reloadData: false
  //       })

  //     }
  //   )

  // }
  componentDidMount() {
    console.log("-------------------componentDidMount ----------------------");
    const storeName = this.props.match.params.businessName;
    // this.props.dispatch(getInprocessQueue(storeName))
    // this.props.dispatch(getWaitingQueue(storeName))
    this.props.dispatch(findQueueForShowQueuePage(storeName))
    this.callAPI();
    this.intervalID = setInterval(this.callAPI.bind(this), 5000);
    document.getElementById('navigation-bar').style.display = "none";
    document.getElementById('footer-id').style.display = "none";
    document.body.style.overflow = "hidden"
   

    // const user = this.props.user;

    // if (user) {
    //   this.setState({
    //     currentUser: user
    //   });
    // }
  }

  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
    clearInterval(this.intervalID);
  }

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    console.log("11111111111111111111111111", this.state.currentQueueDetailList)
    console.log("previous", this.state.previousQueueDetailList)
    const storeName = this.props.match.params.businessName;
    const previousQueue = this.props.previousQueue;
    const waitingQueueList = this.props.waitingQueue;
    const inprocessAndDoneQueue = this.props.inprocessAndDoneQueue;
    const branch = this.props.match.params.branch;
    const { currentUser, rightChevron, leftChevron, allQueueDetail } = this.state;
    console.log("allQueueDetail : ", allQueueDetail);

    return (
      <div style={{ marginInline: "1%"}}>
        <div className="row" style={{ margin: "auto" }}>
          <div className="col-md-9">
            <div class="card text-center" style={{ marginTop: "0px", height: "50vh" }}>
              <div class="card-header" style={{ backgroundColor: "#222", borderRadius: "5px" }}>
                <h1 className="h1" style={{ color: "#F2C035" }}>{storeName}</h1>
              </div>
              <div class="card-body">
                {allQueueDetail.inprocessQueue.length > 0 ? (
                  <>
                    <h1 className="h1 mt-4">หมายเลขคิว</h1>
                    <p className="display-1">{allQueueDetail.inprocessQueue[0].queue_no}</p>
                    <h2 className="h2">เชิญที่ช่องบริการ</h2>
                    <p className="display-3">{allQueueDetail.inprocessQueue[0].service_no}</p>
                  </>
                ) : (
                  <div style={{ textAlign: "center", color: "gray" }}>
                    <h1 className="h1 mt-5">
                      ไม่มีคิวที่กำลังเข้ารับบริการ
                    </h1>
                  </div>
                )}
              </div>
            </div>


            <div class="card" style={{ marginTop: "0px", marginBottom: "0px", padding: "0 25 0", height: "35vh" }}>
              <div class="card-header" style={{ backgroundColor: "#222", padding: "2px", borderRadius: "5px" }}>
                <h1 className="h2 ml-5" style={{ color: "#F2C035" }}>คิวถัดไป</h1>
              </div>
              <div class="card-body">
                {allQueueDetail.waitingQueue.length > 0 ? (
                  <>
                    <div className="text-center" style={{ paddingInline: "30px" }}>
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
                        {allQueueDetail.waitingQueue.map((item) => {
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
                  </>
                ) : (
                  <div style={{ textAlign: "center", color: "gray" }}>
                    <h1 className="h3 mt-5">
                      ไม่มีคิวถัดไป
                            </h1>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div class="card text-center" style={{ height: "100%", marginTop: "0px" }}>
              <div class="card-header row" style={{ backgroundColor: "#222", borderRadius: "5px", padding: "2px" }}>
                <h1 className="h2 mt-3 col" style={{ color: "#F2C035" }}>หมายเลขคิว</h1>
                <h1 className="h2 mt-3 col" style={{ color: "#F2C035" }}>ช่องบริการ</h1>
              </div>
              <div class="card-body" style={{ overflowY: "hidden", overflowX: 'hidden' }}>
                <table class="card-table table">
                  {allQueueDetail.inprocessAndDoneQueue.length > 0 ? (
                    allQueueDetail.inprocessAndDoneQueue.map((item) => {
                      return <tbody>
                        <tr>
                          <td className="display-4 card-text">{item.queue_no}</td>
                          <td className="display-4 card-text">{item.service_no}</td>
                        </tr>
                      </tbody>
                    })
                  ) : (
                    <div style={{ textAlign: "center", color: "gray" }}>
                      <h1 className="h1 mt-5">
                        ไม่มีคิวที่เรียกไปแล้ว
                    </h1>
                    </div>
                  )}
                </table>
              </div>
            </div>

            {/* <div style={{ borderWidth: "1px", maxHeight: "80vh", overflowY: "scroll", overflowX: 'hidden' }}>
                <div className="row d-flex flex-column" style={{ alignContent: "center" }}>
                  <div className="col-md-10">
                    <div className="card">
                      <div className="row">
                        <div className="col">
                          

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
              <div style={{ textAlign: "center", color: "gray" }}>
                <h1 className="h3">
                  ไม่มีคิวที่เรียกไปแล้ว
                    </h1>
              </div>
            )} */}

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
  console.log("mapstateToProps : ", state);
  const { previousQueue, waitingQueue, inprocessAndDoneQueue } = state.userQueue;
  return {
    user,
    isLoggedIn,
    message,
    previousQueue,
    waitingQueue,
    inprocessAndDoneQueue
  };
}

export default connect(mapStateToProps)(ShowQueuePage);
