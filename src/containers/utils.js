export const required = value => (value ? undefined : "Required");

export const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? "lightgreen" : "AliceBlue",
  ...draggableStyle
}); 

export const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "SteelBlue",
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const onSubmit = async values => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

export const makeOnDragEndFunction = fields => result => {
  // dropped outside the list
  if (!result.destination) {
    return;
  }
  fields.swap(result.source.index, result.destination.index);
};