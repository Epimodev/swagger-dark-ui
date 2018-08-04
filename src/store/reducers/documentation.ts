import { Action } from 'src/store';
import { OperationDocumentation } from 'src/types/documentation';

export interface DocumentationState {
  name: string;
  version: string;
  baseUrl: string;
  operations: OperationDocumentation[];
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  filterQuery: string;
}

const initialState: DocumentationState = {
  name: '',
  version: '',
  baseUrl: '',
  operations: [],
  status: 'INIT',
  filterQuery: '',
};

function reducer(state: DocumentationState = initialState, action: Action): DocumentationState {
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
        ...action.payload,
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
