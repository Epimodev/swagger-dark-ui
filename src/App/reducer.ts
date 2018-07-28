import { DocumentationState, DocumentationAction } from './types';

const initialState: DocumentationState = {
  name: '',
  version: '',
  basePath: '',
  methods: [],
  status: 'LOADED',
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
      };
    case 'FETCH_SWAGGER_FAIL':
      return {
        ...state,
        status: 'ERROR',
      };
  }
  return state;
}

export default reducer;
