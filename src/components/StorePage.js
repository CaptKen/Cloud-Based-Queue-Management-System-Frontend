import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import GetQueueHeader from './GetQueueHeader';
import { Container } from 'react-bootstrap';
import AutoPlayCarousel from './PlaceList';

import IMG1 from '../statics/business adv/ก.jpg'
import IMG2 from '../statics/business adv/ข.jpg'
import IMG3 from '../statics/business adv/ค.jpg'

class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
        <div>
            <GetQueueHeader storeName="Burin Ladkrabang" waitingQueue={3}/>
            <Carousel style={{margin:50}} >
                <Carousel.Item interval={1000} style={{borderRadius:"15px"}}>
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
                </Carousel.Item>
                <Carousel.Item interval={500}>
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
                </Carousel.Item>
                </Carousel>

                {/* <AutoPlayCarousel typeName="ร้านอื่นๆ"/> */}
        </div>
    );
  }
}

export default StorePage;