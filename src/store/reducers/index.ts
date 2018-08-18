import { combineReducers } from 'redux';
import selectionReducer, { SelectDocState } from './selection';
import documentationReducer, { DocumentationState } from './documentation';
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
