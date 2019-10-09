import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form'

import { createDataReduxForm, removeDataReduxForm } from '../../redux/modules/data'
import Template from './Template'

class ReduxForm extends React.Component {
  // componentWillUnmount() {
  //   this.props.removeDataReduxForm()
  // }

  render() {
    const { reduxFormValues, dataArray, creating, createDataReduxForm, removeDataReduxForm } = this.props;
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
          initialValues={{ customers: dataArray }}
          customProps={{ 
            reduxFormValues, 
            onRemoveDataArray: removeDataReduxForm,
            onCreateDataArray: createDataReduxForm, 
            dataArray, 
            creating, 
          }}  
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    reduxFormValues: getFormValues('reduxForm')(state),
    dataArray: state.data.reduxForm.dataArray,
    creating: state.data.reduxForm.creating,
  }),
  {
    createDataReduxForm,
    removeDataReduxForm,
  },
)(ReduxForm);
