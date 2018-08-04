import { combineReducers } from 'redux';
import selectionReducer, { SelectDocState } from './selection';
import documentationReducer, { DocumentationState } from './documentation';
import { SelectionAction } from '../actions/selection/types';
import { DocumentationAction } from '../actions/documentation/types';

interface StoreState {
  selection: SelectDocState;
  documentation: DocumentationState;
}

type Action = SelectionAction | DocumentationAction;
const reducers = combineReducers<StoreState>({
  selection: selectionReducer,
  documentation: documentationReducer,
});

export default reducers;
export { StoreState, Action };
