import React from 'react';
import { connect } from 'react-redux';

import { createDataArray, removeDataArray } from '../../redux/modules/data'
import Template from './Template'

class Formik extends React.Component {
  componentWillUnmount() {
    this.props.removeDataArray()
  }

  render() {
    const { dataArray, createDataArray, removeDataArray } = this.props;
    return (
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col">
            <div className="d-flex justify-content-center">
              <h1>formik</h1>
            </div>
          </div>
        </div>
        <Template 
          customProps={{ 
            onRemoveDataArray: removeDataArray,
            onCreateDataArray: createDataArray, 
            dataArray 
          }}  
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    dataArray: state.data.customers,
  }),
  {
    createDataArray,
    removeDataArray,
  },
)(Formik);
