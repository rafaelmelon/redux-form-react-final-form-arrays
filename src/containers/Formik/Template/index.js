import React from "react";
import { Formik, Form, Field, FieldArray } from 'formik';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { required, getItemStyle, getListStyle, onSubmit, makeOnDragEndFunction } from '../../utils';

const Input = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  placeholder, 
  type
}) => (
  <div className="input-group">
    <input className={`form-control ${touched[field.name] && errors[field.name] ? "is-invalid" : ""}`} {...field} min="0" type={type} placeholder={placeholder} />
    {touched[field.name] &&
        errors[field.name] && <div className="invalid-feedback">{errors[field.name]}</div>}
  </div>
);

// let nextId = 1;

const Template = props => {
  const { onRemoveDataArray, onCreateDataArray, dataArray } = props.customProps
  
  // const handlePopulate = callback => {
  //   if (dataArray) {
  //     dataArray.forEach(item => {
  //       callback("customers", item)
  //     })
  //   }
  // }

  return (
    <Formik
      onSubmit={onSubmit}
      render={formProps => {
        const {
          // setFieldValue,
          resetForm,
          isSubmitting,
          values,
        } = formProps;

        console.log(formProps)
        
        return (
          <Form>
            <div className="row mb-3">
              <div className="col">
                <div className="d-flex justify-content-start">
                  <button
                    className="btn btn-primary mr-3"
                    type="button"
                    // onClick={() => setFieldValue("customers", { id: nextId++ })}
                    disabled={true}
                  >
                    Add
                  </button>
                  <button 
                    className="btn btn-outline-danger mr-3" 
                    type="button" 
                    onClick={() => null}
                  >
                    Remove
                  </button>
                  <button 
                    className="btn btn-primary mr-3" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => resetForm()}
                    disabled={isSubmitting}
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
                    // onClick={() => handlePopulate(setFieldValue)}
                    // disabled={!dataArray}
                    disabled={true}
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
              render={arrayHelpers => {
                const isValues = values.customers && values.customers.length > 0;

                if (isValues) {
                  return (
                    <DragDropContext onDragEnd={makeOnDragEndFunction(values)}>
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
                              {values.customers.map((item, index) => (
                                <Draggable
                                  key={item.id}
                                  draggableId={item}
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
                                        <label name={item.id}>{`Cust. #${index + 1}`}</label>
                                      </div>
                                      <div className="col">
                                        <Field
                                          name={`${item.id}.firstName`}
                                          component={Input}
                                          placeholder="First Name"
                                          validate={required}
                                        />
                                      </div>
                                      <div className="col">
                                        <Field
                                          name={`${item.id}.lastName`}
                                          component={Input}
                                          placeholder="Last Name"
                                          validate={required}
                                        />
                                      </div>
                                      <div className="col">
                                        <button 
                                          className="btn btn-outline-danger" 
                                          type="button" 
                                          onClick={() => arrayHelpers.remove(index)}
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
                }
                
                return (
                  <button 
                    type="button" 
                    onClick={() => dataArray && dataArray.forEach(item => {
                      console.log(item)
                      arrayHelpers.push(item)
                    })}
                  >
                    Add a friend
                  </button>
                )
              }}
            />
          </Form>
        )
      }}
    />
  );
}

export default Template;
