import React from 'react';
import { connect } from 'react-redux';

import { createDataReactFinalForm, removeDataReactFinalForm } from '../../redux/modules/data'
import Template from './Template'

class ReactFinalForm extends React.Component {
  // componentWillUnmount() {
  //   this.props.removeDataReactFinalForm()
  // }

  render() {
    const { dataArray, creating, createDataReactFinalForm, removeDataReactFinalForm } = this.props;
    return (
      <div className="container mt-5">
        <div className="row mb-3">
          <div className="col">
            <div className="d-flex justify-content-center">
              <h1>react-final-form</h1>
            </div>
          </div>
        </div>
        <Template 
          customProps={{ 
            onRemoveDataArray: removeDataReactFinalForm,
            onCreateDataArray: createDataReactFinalForm, 
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
    dataArray: state.data.reactFinalForm.dataArray,
    creating: state.data.reactFinalForm.creating,
  }),
  {
    createDataReactFinalForm,
    removeDataReactFinalForm,
  },
)(ReactFinalForm);
