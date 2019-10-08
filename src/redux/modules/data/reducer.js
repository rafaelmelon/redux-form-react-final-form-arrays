import { DATA_GET_ALL } from './action';

const initialState = {
  all: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_GET_ALL: {
      return { ...state, all: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as dataReducer };
