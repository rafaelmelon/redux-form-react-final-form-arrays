import { 
  DATA_CREATE_ARRAY, 
  DATA_CREATING_ARRAY, 
  DATA_REMOVE_ARRAY 
} from './action';

const initialState = {
  dataArray: null,
  creating: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_CREATE_ARRAY: {
      return { 
        ...state, 
        dataArray: action.payload,
        creating: false,
      };
    }
    case DATA_CREATING_ARRAY: {
      return { 
        ...state, 
        creating: true,
      };
    }
    case DATA_REMOVE_ARRAY: {
      return { 
        ...state, 
        dataArray: null,
        creating: false,
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as dataReducer };
