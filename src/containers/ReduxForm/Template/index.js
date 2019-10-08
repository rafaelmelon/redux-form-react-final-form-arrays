import React from "react";
import { Field, FieldArray, reduxForm } from 'redux-form'
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
                      <label name={name}>Cust. #${index + 1}</label>
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
  const { reduxFormValues, onRemoveDataArray, onPopulate, onCreateDataArray, dataArray } = customProps

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
              onClick={() => onCreateDataArray(isCustomersLength || 0)}
            >
              Create data
            </button>
            <button 
              className="btn btn-primary mr-3" 
              type="button" 
              onClick={onPopulate}
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
})(Template)
