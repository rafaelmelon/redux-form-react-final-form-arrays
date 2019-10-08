import { DATA_CREATE_ARRAY, DATA_REMOVE_ARRAY } from './action';

const initialState = {
  customers: null,
};

const createArray = length => {
  const arr = [];
  const len = length || 25;
  for (let i = 0; i < len; i++) {
    arr.push({
      id: i,
    });
  }
  return arr;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_CREATE_ARRAY: {
      return { ...state, customers: createArray(action.payload) };
    }
    case DATA_REMOVE_ARRAY: {
      return { ...state, customers: null };
    }
    default: {
      return state;
    }
  }
};

export { reducer as dataReducer };
