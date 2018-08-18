import { combineReducers } from 'redux';
import selectionReducer from './selection';
import { SelectDocState } from './selection/types';
import documentationReducer from './documentation';
import { DocumentationState } from './documentation/types';
import { SelectionAction } from '../actions/selection/types';

interface StoreState {
  selection: SelectDocState;
  documentation: DocumentationState;
}

type Action = SelectionAction;
const reducers = combineReducers<StoreState>({
  selection: selectionReducer,
  documentation: documentationReducer,
});

export default reducers;
export { StoreState, Action };
