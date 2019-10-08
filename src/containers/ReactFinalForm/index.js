import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Template from './Template'

class ReactFinalForm extends React.Component {
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center">
              <h1>react-final-form</h1>
            </div>
          </div>
        </div>
        <Template />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  {},
)(ReactFinalForm);
