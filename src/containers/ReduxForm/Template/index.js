import React from "react";
import { Field, FieldArray, reduxForm } from 'redux-form'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { required, getItemStyle, getListStyle, onSubmit, makeOnDragEndFunction } from '../../utils';
import { Input } from '../../../components';

let nextId = 1;

const renderFields = ({ fields }) => (
  <DragDropContext onDragEnd={makeOnDragEndFunction(fields)}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className="row mb-3"
          style={getListStyle(snapshot.isDraggingOver)}
        >
          <div className="col-md-4 mt-3">
            <Field
              className="form-control"
              name="company"
              component={Input}
              placeholder="Company"
              validate={required}
            />
          </div>
          <div className="col-md-12 p-3">
            {fields.map((name, index) => (
              <Draggable
                key={name}
                draggableId={name}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    className="form-row p-3 border-bottom"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <div className="col">
                      <label name={name}>{`Cust. #${index + 1}`}</label>
                    </div>
                    <div className="col">
                      <Field
                        className="form-control"
                        name={`${name}.firstName`}
                        component={Input}
                        placeholder="First Name"
                        validate={required}
                      />
                    </div>
                    <div className="col">
                      <Field
                        className="form-control"
                        name={`${name}.lastName`}
                        component={Input}
                        placeholder="Last Name"
                        validate={required}
                      />
                    </div>
                    <div className="col">
                      <button 
                        className="btn btn-outline-danger" 
                        type="button" 
                        onClick={() => fields.remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

const Template = props => {
  const { pristine, reset, submitting, array: { push, pop }, customProps, invalid } = props;
  const { reduxFormValues, onRemoveDataArray, onCreateDataArray, dataArray, creating } = customProps

  const isCustomersLength = reduxFormValues && reduxFormValues.customersLength;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(reduxFormValues)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col">
          <div className="d-flex justify-content-start">
            <button
              className="btn btn-primary mr-3"
              type="button"
              onClick={() => push("customers", { id: nextId++ })}
            >
              Add
            </button>
            <button 
              className="btn btn-outline-danger mr-3" 
              type="button" 
              onClick={() => pop("customers")}
            >
              Remove
            </button>
            <button 
              className="btn btn-primary mr-3" 
              type="submit" 
              disabled={submitting || pristine || invalid}
            >
              Submit
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="col-md-2">
          {
            creating ? 
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div> : 
            <Field
              name="customersLength"
              component={Input}
              placeholder="0"
              type="number"
            />
          }
        </div>
        <div className="col">
          <div className="d-flex justify-content-end">
            <button 
              className="btn btn-primary mr-3" 
              type="button" 
              onClick={() => onCreateDataArray(isCustomersLength || 0)}
            >
              Populate
            </button>
            <button 
              className="btn btn-outline-danger" 
              type="button" 
              onClick={onRemoveDataArray}
              disabled={!dataArray}
            >
              Remove data
            </button>
          </div>
        </div>
      </div>
      <FieldArray name="customers" component={renderFields} />
      <div className="row">
        <div className="col">
          <pre>{JSON.stringify(reduxFormValues, 0, 2)}</pre>
        </div>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'reduxForm',
  enableReinitialize: true
})(Template)
