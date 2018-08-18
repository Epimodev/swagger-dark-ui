import selectionReducer from './selection';
import { SelectDocState } from './selection/types';
import { DocumentationState } from './documentation/types';
import { SelectionAction } from '../actions/selection/types';

type asyncReducerName = 'documentation';

interface StoreState {
  selection: SelectDocState;
  documentation?: DocumentationState;
}

type Action = SelectionAction;
const reducers = {
  selection: selectionReducer,
};

export default reducers;
export { StoreState, Action, asyncReducerName };
