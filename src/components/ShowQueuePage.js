import React, { Component } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { Container } from 'react-bootstrap';

class ShowQueuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
      activeItemIndex: 0,
    };
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
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
                <p className="display-1">A12</p>
                <h2 className="h2">เชิญที่ช่องบริการ</h2>
                <p className="display-3">A</p>
              </div>
            </div>

            <h1 className="h2 ml-5">คิวถัดไป</h1>
            <div className="text-center" style={{ borderWidth: "1px", paddingInline:"30px"}}>
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
                <div>
                  <div className="card">
                    <div class="card-body">
                      <h1 className="card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="card">
                    <div class="card-body">
                      <h1 className="card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="card">
                    <div class="card-body">
                      <h1 className="card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="card">
                    <div class="card-body">
                      <h1 className=" card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="card">
                    <div class="card-body">
                      <h1 className="card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="card">
                    <div class="card-body">
                      <h1 className="card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>
              </ItemsCarousel>
              {/* <div className="row d-flex text-center" >
                <div className="col-md-3">
                  <div className="card">
                    <div class="card-body">
                      <h1 className="h3 card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card">
                    <div class="card-body">
                      <h1 className="h3 card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card">
                    <div class="card-body">
                      <h1 className="h3 card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card">
                    <div class="card-body">
                      <h1 className="h3 card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card">
                    <div class="card-body">
                      <h1 className="h3 card-title">หมายเลขคิว</h1>
                      <p className="display-4 card-text">A12</p>
                    </div>
                  </div>
                </div>

              </div> */}
            </div>


          </div>
          <div className="col-md-3">
            <h1 className="h2 mt-3">คิวที่เรียกไปแล้ว</h1>
            <div style={{ borderWidth: "1px", maxHeight: "80vh", overflowY: "scroll", overflowX:'hidden' }}>
              <div className="row d-flex flex-column" style={{ alignContent: "center" }}>
                <div className="col-md-10">
                  <div className="card">
                    <div className="row">
                      <div className="col">
                        <div class="card-body text-center">
                          <h1 className="h4 card-title">หมายเลขคิว</h1>
                          <p className="display-4 card-text">A12</p>
                        </div>
                      </div>

                      <div className="col">
                        <div class="card-body text-center">
                          <h1 className="h4 card-title">ช่องบริการ</h1>
                          <p className="display-4 card-text">A</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="card">
                    <div className="row">
                      <div className="col">
                        <div class="card-body text-center">
                          <h1 className="h4 card-title">หมายเลขคิว</h1>
                          <p className="display-4 card-text">A12</p>
                        </div>
                      </div>

                      <div className="col">
                        <div class="card-body text-center">
                          <h1 className="h4 card-title">ช่องบริการ</h1>
                          <p className="display-4 card-text">A</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="card">
                    <div className="row">
                      <div className="col">
                        <div class="card-body text-center">
                          <h1 className="h4 card-title">หมายเลขคิว</h1>
                          <p className="display-4 card-text">A12</p>
                        </div>
                      </div>

                      <div className="col">
                        <div class="card-body text-center">
                          <h1 className="h4 card-title">ช่องบริการ</h1>
                          <p className="display-4 card-text">A</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="card">
                    <div className="row">
                      <div className="col">
                        <div class="card-body text-center">
                          <h1 className="h4 card-title">หมายเลขคิว</h1>
                          <p className="display-4 card-text">A12</p>
                        </div>
                      </div>

                      <div className="col">
                        <div class="card-body text-center">
                          <h1 className="h4 card-title">ช่องบริการ</h1>
                          <p className="display-4 card-text">A</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default ShowQueuePage;
