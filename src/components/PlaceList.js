import React from 'react';
import range from 'lodash/range';
import styled from 'styled-components';
// import ItemsCarousel from '../ItemsCarousel';
import ItemsCarousel from 'react-items-carousel';

const noOfItems = 12;
const noOfCards = 3;
const autoPlayDelay = 2000;
const chevronWidth = 40;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  height: 200px;
  background: #EEE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;


export default class AutoPlayCarousel extends React.Component {
  state = {
    activeItemIndex: 0,
    noOfItems: 12,
    noOfCards:3,
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
    activeItemIndex: (prevState.activeItemIndex + 1) % (this.state.noOfItems-this.state.noOfCards + 1),
  }));

  onChange = value => this.setState({ activeItemIndex: value });

  render() {
    return (
    //   <Wrapper>
    //     <ItemsCarousel
    //       gutter={12}
    //       numberOfCards={this.state.noOfCards}
    //       activeItemIndex={this.state.activeItemIndex}
    //       requestToChangeActive={this.onChange}
    //       rightChevron={<button>{'>'}</button>}
    //       leftChevron={<button>{'<'}</button>}
    //       chevronWidth={this.state.chevronWidth}
    //       outsideChevron
    //     //   children={carouselItems}
    //     />
    //     <div style={{ height: 200, background: '#EEE' }}>First card</div>
    //     <div style={{ height: 200, background: '#EEE' }}>Second card</div>
    //     <div style={{ height: 200, background: '#EEE' }}>Third card</div>
    //     <div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
    //   </Wrapper> 
        <div>
            <br/>
        <h1>{this.state.typeName}</h1>
        <hr/><br/>
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
        <SlideItem style={{ height: 200, background: '#EEE' }}>First card</SlideItem>
        <div style={{ height: 200, background: '#EEE' }}>Second card</div>
        <SlideItem style={{ height: 200, background: '#EEE' }}>Third card</SlideItem>
        <div style={{ height: 200, background: '#EEE' }}>Fourth card</div>
      </ItemsCarousel>
        </div>

    );
  }
}