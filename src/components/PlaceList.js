import React from 'react';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import { withRouter, Link } from 'react-router-dom';

import businessService from '../services/business.service';

// const noOfItems = 12;
// const noOfCards = 3;
// const autoPlayDelay = 2000;
// const chevronWidth = 40;

// const Wrapper = styled.div`
//   padding: 0 ${chevronWidth}px;
//   max-width: 1000px;
//   margin: 0 auto;
// `;

const SlideItem = styled.div`
  height: 200px;
  width: auto;
  background: #EEE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
`;

class AutoPlayCarousel extends React.Component {
  state = {
    activeItemIndex: 0,
    noOfItems: 12,
    noOfCards: 4,
    autoPlayDelay: 2000,
    chevronWidth: 40,
    setActiveItemIndex: 0,
    typeName: this.props.typeName,
    storeName: "store",
    listByCategory: [],
    fileInfos: {},
  };

  componentDidMount() {
    // this.interval = setInterval(this.tick, this.state.autoPlayDelay);
    this.callAPI();
    // this.getIconsImg();
    // this.forceUpdate()
  }

  callAPI() {
    console.log("CallApi()");
    businessService.findByCategoryName(this.state.typeName)
      .then((res) => {
        this.setState({
          ...this.state,
          listByCategory: res.data.listByCategory

        })
        res.data.listByCategory.map((item) => (
          businessService.getIconImg(item.name)
            .then((res) => {
              // return res.data[0].url;
              this.setState({
                ...this.state,
                fileInfos: {
                  ...this.state.fileInfos,
                  [item.name]: res.data[0].url
                },
              })

            })
            .catch((err) => {
              console.error(err);
            })
        ))
      })
      .catch((err) => {
        console.error(err);
      })
  }

  // getIconsImg() {
  //   const { listByCategory } = this.state
  //   console.log("getIcon", listByCategory);
  //   listByCategory.map((item) => (
  //     businessService.getIconImg(item.name)
  //       .then((res) => {
  //         console.log(res.data[0])
  //         // return res.data[0].url;
  //         this.setState({
  //           ...this.state,
  //           fileInfos: {
  //             ...this.state.fileInfos,
  //             [item.name]: res.data[0].url
  //           },
  //         })

  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       })
  //   ))

  // }



  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (this.state.noOfItems - this.state.noOfCards + 1),
  }));

  onChange = value => this.setState({ activeItemIndex: value });

  redirectToStore = () => {
    this.props.history.push('/store');
  }

  render() {
    const { listByCategory, fileInfos } = this.state;
    console.log("listByCategory : ", listByCategory);
    console.log("fileInfos : ", fileInfos);

    return (
      <div>
        <div style={{ marginTop: "30px" }}>
          <h1 className="h1">{this.state.typeName}</h1>
          <hr /><br />
          <ItemsCarousel
            requestToChangeActive={this.onChange}
            activeItemIndex={this.state.activeItemIndex}
            numberOfCards={this.state.noOfCards}
            gutter={20}
            leftChevron={<button>{'<'}</button>}
            rightChevron={<button>{'>'}</button>}
            outsideChevron
            chevronWidth={this.state.chevronWidth}
          >
            {listByCategory.map((item) => (
              <SlideItem key={item.name}>
                <Link to={"/store/" + item.name + "/" + item.branch} style={{ width: "100%", height: "100%" }}>
                  <img
                    className="img-responsive w-100 h-100"
                    // src={LOGO1}
                    src={fileInfos.[item.name]}
                    alt={item.name + "'s icon"}
                  />
                </Link>
              </SlideItem>
            ))}
            {/* <SlideItem >
              <img
                className="img-responsive w-100 h-100"
                src={LOGO1}
                alt="First slide"
                width="100%"
              /></SlideItem>
            <SlideItem style={{ background: '#EEE' }} onClick={this.redirectToStore}>
              <img
                className="img-responsive w-100 h-100"
                src={LOGO5}
                alt="First slide"
                width="100%"
              /></SlideItem>
            <SlideItem>
              <Link to={"/" + this.state.storeName} style={{ width: "100%" }}>
                <img
                  className="img-responsive w-100 h-100"
                  src={LOGO1}
                  alt="First slide"
                />
              </Link>
            </SlideItem>
            <SlideItem>
              <img
                className="img-responsive w-100 h-100"
                src={LOGO3}
                alt="First slide"
                width="100%"
              /></SlideItem>
            <SlideItem>
              <img
                className="img-responsive w-100 h-100"
                src={LOGO4}
                alt="First slide"
                width="100%"
              /></SlideItem> */}
            {/* <div style={{ height: 200, background: '#EEE' }}>3</div>
            <div style={{ height: 200, background: '#EEE' }}>4</div>
            <div style={{ height: 200, background: '#EEE' }}>5</div>
            <div style={{ height: 200, background: '#EEE' }}>6</div> */}
          </ItemsCarousel>
        </div>
      </div>
    );
  }
}

export default withRouter(AutoPlayCarousel)