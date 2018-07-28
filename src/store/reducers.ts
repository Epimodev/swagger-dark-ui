// import { combineReducers } from 'redux';
import { DocumentationState, DocumentationAction } from 'src/App/types';
import AppReducer from 'src/App/reducer';

interface StoreState extends DocumentationState {}

type Action = DocumentationAction;

// const reducers = combineReducers<StoreState>({});
const reducers = AppReducer;

export default reducers;
export { StoreState, Action };
