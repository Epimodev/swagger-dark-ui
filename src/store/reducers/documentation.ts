import { Action } from 'src/store';
import { OperationDocumentation } from 'src/types/documentation';

export interface DocumentationState {
  name: string;
  version: string;
  baseUrl: string;
  operations: OperationDocumentation[];
  filterQuery: string;
}

const initialState: DocumentationState = {
  name: '',
  version: '',
  baseUrl: '',
  operations: [],
  filterQuery: '',
};

function reducer(state: DocumentationState = initialState, action: Action): DocumentationState {
  switch (action.type) {
    case 'FETCH_SWAGGER_SUCCESS':
      return {
        ...state,
        ...action.payload,
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
