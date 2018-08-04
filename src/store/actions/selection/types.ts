import { OperationDocumentation } from 'src/types/documentation';

export type UPDATE_DROP_ZONE_STATUS = {
  type: 'UPDATE_DROP_ZONE_STATUS';
  payload: 'EMPTY' | 'BAD_FORMAT';
};

export type UPDATE_DOC_URL = {
  type: 'UPDATE_DOC_URL';
  payload: string;
};

export type FETCH_SWAGGER_START = {
  type: 'FETCH_SWAGGER_START';
};

export type FETCH_SWAGGER_SUCCESS = {
  type: 'FETCH_SWAGGER_SUCCESS';
  payload: {
    name: string;
    version: string;
    baseUrl: string;
    operations: OperationDocumentation[];
  };
};

export type FETCH_SWAGGER_FAIL = {
  type: 'FETCH_SWAGGER_FAIL';
};

export type SET_FILTER_VALUE = {
  type: 'SET_FILTER_VALUE';
  payload: string;
};

export type SelectionAction =
  | UPDATE_DROP_ZONE_STATUS
  | UPDATE_DOC_URL
  | FETCH_SWAGGER_START
  | FETCH_SWAGGER_SUCCESS
  | FETCH_SWAGGER_FAIL
  | SET_FILTER_VALUE;
