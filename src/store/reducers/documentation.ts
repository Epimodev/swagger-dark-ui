import { Action } from 'src/store';
import { OperationDocumentation } from 'src/types/documentation';

export interface DocumentationState {
  name: string;
  version: string;
  baseUrl: string;
  operations: OperationDocumentation[];
}

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
        ...action.payload,
      };
    case 'RESET_APP':
      return initialState;
  }
  return state;
}

export default reducer;
