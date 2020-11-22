import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import GetQueueHeader from './GetQueueHeader';
import { Container } from 'react-bootstrap';

class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
        <Container>
            <GetQueueHeader storeName="Burin Ladkrabang" waitingQueue={3}/>
            <Carousel>
                <Carousel.Item interval={1000}>
                    <img
                    className="d-block w-100"
                    src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg"
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>โฆษณา โปรโมชั่น</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                    className="d-block w-100"
                    src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="https://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg"
                    alt="Third slide"
                    />
                    <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
        </Container>
    );
  }
}

export default StorePage;