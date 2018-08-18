import { Action } from 'src/store';
import { DocumentationState } from './types';
import { getBaseUrl, getOperations } from './utils';

const initialState: DocumentationState = {
  name: '',
  version: '',
  baseUrl: '',
  operations: [],
};

function reducer(state: DocumentationState = initialState, action: Action): DocumentationState {
  switch (action.type) {
    case 'FETCH_SWAGGER_SUCCESS':
      return {
        ...state,
        name: action.payload.info.title,
        version: action.payload.info.version,
        baseUrl: getBaseUrl(action.payload),
        operations: getOperations(action.payload),
      };
    case 'RESET_APP':
      return initialState;
  }
  return state;
}

export default reducer;
