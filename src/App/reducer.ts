import { DocumentationState, DocumentationAction } from './types';
import { getBaseUrl, getOperations } from './utils';

const initialState: DocumentationState = {
  name: '',
  version: '',
  baseUrl: '',
  operations: [],
  status: 'LOADED',
  filterQuery: '',
};

function reducer(
  state: DocumentationState = initialState,
  action: DocumentationAction,
): DocumentationState {
  switch (action.type) {
    case 'FETCH_SWAGGER_START':
      return {
        ...state,
        status: 'LOADING',
      };
    case 'FETCH_SWAGGER_SUCCESS':
      return {
        ...state,
        status: 'LOADED',
        name: action.payload.info.title,
        version: action.payload.info.version,
        baseUrl: getBaseUrl(action.payload),
        operations: getOperations(action.payload),
      };
    case 'FETCH_SWAGGER_FAIL':
      return {
        ...state,
        status: 'ERROR',
      };
    case 'SET_FILTER_VALUE':
      return {
        ...state,
        filterQuery: action.payload,
      };
  }
  return state;
}

export default reducer;
