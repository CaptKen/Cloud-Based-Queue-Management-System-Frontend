import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class BusinessLocation extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         center: {
    //             lat: this.props.lat,
    //             lng: this.props.lng
    //         },
    //         zoom: 11
    //     };

    // }

    static defaultProps = {
        center: {
            // lat: 13.7241,
            // lng: 100.7834

            // lat: this.props.lat,
            // lng: this.props.lng
        },
        zoom: 11
    };

    render() {
        console.log("latttttttt", this.props.lat)
        console.log("lnggggggggggg", this.props.lng)
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyB39kdWlUdqS-D1uXrcUlRNjjT0U7xUWNU" }}
                    defaultCenter={this.props.center}
                // defaultZoom={this.state.zoom}
                >
                    <AnyReactComponent
                        lat={this.props.lat}
                        lng={this.props.lng}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default BusinessLocation;