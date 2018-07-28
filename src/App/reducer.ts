import { DocumentationState, DocumentationAction } from './types';
import { getBaseUrl, getMethods } from './utils';

const initialState: DocumentationState = {
  name: '',
  version: '',
  baseUrl: '',
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
        name: action.payload.info.title,
        version: action.payload.info.version,
        baseUrl: getBaseUrl(action.payload),
        methods: getMethods(action.payload),
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
