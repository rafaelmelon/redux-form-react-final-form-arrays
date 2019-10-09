import React, { useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { required, getItemStyle, getListStyle, onSubmit, makeOnDragEndFunction } from '../../utils';
import { Input } from '../../../components';

let nextId = 1;

const Template = props => {
  const [isSubscription, changeSubscription] = useState(false);
  const { onRemoveDataArray, onCreateDataArray, dataArray, creating } = props.customProps

  const handlePopulate = callback => {
    if (dataArray) {
      dataArray.forEach(item => {
        callback("customers", item);
      });
    }
  }

  const customSubscription = { 
    values: false,
    submitting: false, 
    pristine: false, 
    dirty: false,
    dirtySinceLastSubmit: false,
    invalid: false,
  }

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators
      }}
      subscription={customSubscription}
      render={renderProps => {
        const {
          handleSubmit,
          form,
          pristine,
          submitting,
          values
        } = renderProps;
        const { reset, mutators: { push, pop  } } = form;

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
                    disabled={submitting || pristine}
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
                  {isSubscription ? 
                    <button 
                      className="btn btn-primary mr-3" 
                      type="button" 
                      onClick={() => {
                        changeSubscription(false)
                      }}
                    >
                      Create data
                    </button> :
                    <FormSpy 
                      subscription={{ values: true }}
                    >
                      {({ values }) => (
                        <button 
                          className="btn btn-primary mr-3" 
                          type="button" 
                          onClick={() => {
                            onCreateDataArray(values && values.customersLength || 0)
                            changeSubscription(true)
                          }}
                        >
                          Create data
                        </button>
                      )}
                    </FormSpy>
                  }
                  <button 
                    className="btn btn-primary mr-3" 
                    type="button" 
                    onClick={() => handlePopulate(push)}
                    disabled={!dataArray}
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
            <FieldArray 
              name="customers"
              subscription={customSubscription}
            >
              {({ fields }) => (
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
                            name="Company"
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
                                    <Field name={`${name}.id`}>
                                      {({ input: { name, value } }) => (
                                        <label name={name}>Cust. #{value}</label>
                                      )}
                                    </Field>
                                  </div>
                                  <div className="col">
                                    <Field
                                      name={`${name}.firstName`}
                                      component={Input}
                                      placeholder="First Name"
                                      validate={required}
                                    />
                                  </div>
                                  <div className="col">
                                    <Field
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
              )}
            </FieldArray>
            <div className="row">
              <div className="col">
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </div>
            </div>
            
          </form>
        );
      }}
    />
  );
}

export default Template;
