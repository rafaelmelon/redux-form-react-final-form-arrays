export const DATA_CREATE_ARRAY = "DATA_CREATE_ARRAY";
export const DATA_REMOVE_ARRAY = "DATA_REMOVE_ARRAY";

export const createDataArray = payload => ({
  type: DATA_CREATE_ARRAY,
  payload,
});

export const removeDataArray = () => ({
  type: DATA_REMOVE_ARRAY,
});
