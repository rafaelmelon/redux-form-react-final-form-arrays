export const DATA_CREATE_ARRAY = "DATA_CREATE_ARRAY";
export const DATA_CREATING_ARRAY = "DATA_CREATING_ARRAY";
export const DATA_REMOVE_ARRAY = "DATA_REMOVE_ARRAY";

export const creatingDataArray = () => ({
  type: DATA_CREATING_ARRAY,
});

export const createArray = payload => new Promise((resolve, reject) => {
  const arr = [];
  const len = payload || 25;

  for (let i = 0; i < len; i++) {
    arr.push({
      id: i,
    });
  }
  resolve(arr);
});

export const createDataArray = payload => dispatch => {
  dispatch(creatingDataArray());
  
  return createArray(payload).then(payload => {
    dispatch({
      type: DATA_CREATE_ARRAY,
      payload,
    });
  });
};

export const removeDataArray = () => ({
  type: DATA_REMOVE_ARRAY,
});
