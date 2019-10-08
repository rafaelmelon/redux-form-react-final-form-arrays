import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col">
            <div className="d-flex justify-content-center">
              <h1>redux-form / react-final-form</h1>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center mb-5">
          <div className="col col-lg-2"></div>
          <div className="col-md-auto">
            <div className="d-flex justify-content-center">
              <Link to="/redux-form">redux-form</Link>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="d-flex justify-content-center">
              <Link to="/react-final-form">react-final-form</Link>
            </div>
          </div>
          <div className="col col-lg-2"></div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center">
              <p>GitHub: <a href="https://github.com/rafaelmelon/redux-form-react-final-form-arrays" target="__blank">https://github.com/rafaelmelon/redux-form-react-final-form-arrays</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {},
)(App);
