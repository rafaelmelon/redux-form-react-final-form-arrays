import React from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { Input } from '../../../components/index';

const required = value => (value ? undefined : "Required");

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgreen" : "AliceBlue",
  ...draggableStyle
}); 

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "SteelBlue",
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const makeOnDragEndFunction = fields => result => {
  // dropped outside the list
  if (!result.destination) {
    return;
  }
  fields.swap(result.source.index, result.destination.index);
};
let nextId = 1;

const Template = props => {
  const { onRemoveDataArray, onCreateDataArray, dataArray } = props.customProps
  
  const handlePopulate = callback => {
    if (dataArray) {
      dataArray.forEach(item => {
        callback("customers", item)
      })
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators
      }}
      render={formProps => {
        const {
          handleSubmit,
          form: { reset, mutators: { push, pop  } }, // injected from final-form-arrays above
          pristine,
          submitting,
          values
        } = formProps;

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
                <Field
                  name="customersLength"
                  component={Input}
                  placeholder="0"
                  type="number"
                />
              </div>
              <div className="col">
                <div className="d-flex justify-content-end">
                  <button 
                    className="btn btn-primary mr-3" 
                    type="button" 
                    onClick={() => onCreateDataArray(values.customersLength || 0)}
                  >
                    Create data
                  </button>
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
            <FieldArray name="customers">
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
