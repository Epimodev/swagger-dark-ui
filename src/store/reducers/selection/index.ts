import { Action } from 'src/store';
import { SelectDocState } from './types';

const initialState: SelectDocState = {
  status: 'INIT',
  dropzoneStatus: 'EMPTY',
  url: '',
};

function reducer(state: SelectDocState = initialState, action: Action): SelectDocState {
  switch (action.type) {
    case 'UPDATE_DROP_ZONE_STATUS':
      return {
        ...state,
        dropzoneStatus: action.payload,
      };
    case 'UPDATE_DOC_URL':
      return {
        ...state,
        url: action.payload,
      };
    case 'FETCH_SWAGGER_START':
      return {
        ...state,
        status: 'LOADING',
      };
    case 'FETCH_SWAGGER_SUCCESS':
      return {
        ...state,
        status: 'LOADED',
      };
    case 'FETCH_SWAGGER_FAIL':
      return {
        ...state,
        status: 'ERROR',
      };
    case 'RESET_APP':
      return initialState;
  }
  return state;
}

export default reducer;
