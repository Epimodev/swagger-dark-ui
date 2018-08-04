import { Action } from 'src/store';

export interface SelectDocState {
  docStatus: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  dropzoneStatus: 'EMPTY' | 'BAD_FORMAT';
  url: string;
}

const initialState: SelectDocState = {
  docStatus: 'INIT',
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
  }
  return state;
}

export default reducer;
