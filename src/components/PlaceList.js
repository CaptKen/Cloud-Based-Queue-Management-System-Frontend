import React from 'react';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';
import { withRouter } from 'react-router-dom';

import LOGO1 from '../statics/business logo/a.jpg'
import LOGO2 from '../statics/business logo/b.jpg'
import LOGO3 from '../statics/business logo/c.jpg'
import LOGO4 from '../statics/business logo/d.jpg'
import LOGO5 from '../statics/business logo/e.jpg'

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
`;

class AutoPlayCarousel extends React.Component {
  state = {
    activeItemIndex: 0,
    noOfItems: 12,
    noOfCards: 4,
    autoPlayDelay: 2000,
    chevronWidth: 40,
    setActiveItemIndex: 0,
    typeName: this.props.typeName
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, this.state.autoPlayDelay);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => this.setState(prevState => ({
    activeItemIndex: (prevState.activeItemIndex + 1) % (this.state.noOfItems - this.state.noOfCards + 1),
  }));

  onChange = value => this.setState({ activeItemIndex: value });

  redirectToStore = () => {
    this.props.history.push('/store');
  }

  render() {
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
            <SlideItem >
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
              <img
                className="img-responsive w-100 h-100"
                src={LOGO2}
                alt="First slide"
                width="100%"
              /></SlideItem>
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
              /></SlideItem>
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