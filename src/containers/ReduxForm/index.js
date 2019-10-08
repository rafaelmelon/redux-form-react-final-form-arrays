import React from 'react';
import { connect } from 'react-redux';
import { getFormValues, arrayPush } from 'redux-form'

import { createDataArray, removeDataArray } from '../../redux/modules/data'
import Template from './Template'

class ReduxForm extends React.Component {
  componentWillUnmount() {
    this.props.removeDataArray()
  }

  handlePopulate = () => {
    const { dataArray, arrayPush } = this.props;
    if (dataArray) {
      dataArray.forEach(item => {
        arrayPush('reduxForm', 'customers', item)
      })
    }
  }

  render() {
    const { reduxFormValues, dataArray, createDataArray, removeDataArray } = this.props;
    return (
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col">
            <div className="d-flex justify-content-center">
              <h1>redux-form</h1>
            </div>
          </div>
        </div>
        <Template 
          customProps={{ 
            reduxFormValues, 
            onRemoveDataArray: removeDataArray,
            onCreateDataArray: createDataArray, 
            onPopulate: this.handlePopulate,
            dataArray 
          }}  
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    reduxFormValues: getFormValues('reduxForm')(state),
    dataArray: state.data.customers,
  }),
  {
    createDataArray,
    removeDataArray,
    arrayPush,
  },
)(ReduxForm);
