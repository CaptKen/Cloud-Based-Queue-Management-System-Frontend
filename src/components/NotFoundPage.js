import React, { Component } from "react";


class NotFoundPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
            
          <h3>Not Found Page</h3>
        </header>
      </div>
    );
  }
}
export default NotFoundPage;