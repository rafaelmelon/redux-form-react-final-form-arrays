import React from "react";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
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

const Template = () => (
  <Form
    onSubmit={onSubmit}
    mutators={{
      ...arrayMutators
    }}
    render={({
      handleSubmit,
      form: { mutators: { push, pop  } }, // injected from final-form-arrays above
      pristine,
      reset,
      submitting,
      values
    }) => {
      return (
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <div className="form-group">
                <label>Company</label>
                <Field className="form-control" name="company" component="input" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <button
                className="btn btn-primary mr-3"
                type="button"
                onClick={() => push("customers", { id: nextId++ })}
              >
                Add Customer
              </button>
              <button className="btn btn-danger" type="button" onClick={() => pop("customers")}>
                Remove Customer
              </button>
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
                      <div className="col p-3">
                        {fields.map((name, index) => (
                          <Draggable
                            key={name}
                            draggableId={name}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className="form-row p-3"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div className="form-group col-md-1">
                                  <Field className="form-control" name={`${name}.id`}>
                                    {({ input: { name, value } }) => (
                                      <label name={name}>Cust. #{value}</label>
                                    )}
                                  </Field>
                                </div>
                                <div className="form-group col-md-4">
                                <Field
                                  className="form-control"
                                  name={`${name}.firstName`}
                                  component="input"
                                  placeholder="First Name"
                                />
                                </div>
                                <div className="form-group col-md-4">
                                  <Field
                                    className="form-control"
                                    name={`${name}.lastName`}
                                    component="input"
                                    placeholder="Last Name"
                                  />
                                </div>
                                <div className="form-group col-md-3">
                                  <button 
                                    className="btn btn-danger" 
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
          <div className="row mb-3">
            <div className="col">
              <button className="btn btn-primary mr-3" type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                className="btn btn-warning"
                type="button"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </div>
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      );
    }}
  />
);

export default Template;
