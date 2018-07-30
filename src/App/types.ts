export interface MethodResponse {
  code: number;
  description: string;
  schema: ResponseSchema;
  example: any;
}
export interface OperationDocumentation {
  id: string;
  summary: string;
  description: string;
  method: HttpMethod;
  path: string;
  params: HttpParameter[];
  responses: MethodResponse[];
}

export interface DocumentationState {
  name: string;
  version: string;
  baseUrl: string;
  operations: OperationDocumentation[];
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  filterQuery: string;
}

export type FETCH_SWAGGER_START = {
  type: 'FETCH_SWAGGER_START';
};

export type FETCH_SWAGGER_SUCCESS = {
  type: 'FETCH_SWAGGER_SUCCESS';
  payload: SwaggerSchema;
};

export type FETCH_SWAGGER_FAIL = {
  type: 'FETCH_SWAGGER_FAIL';
};

export type SET_FILTER_VALUE = {
  type: 'SET_FILTER_VALUE';
  payload: string;
};

export type DocumentationAction =
  | FETCH_SWAGGER_START
  | FETCH_SWAGGER_SUCCESS
  | FETCH_SWAGGER_FAIL
  | SET_FILTER_VALUE;
