interface MethodResponse {
  code: number;
  description: string;
  schema: ResponseSchema;
  example: any;
}
export interface OperationDocumentation {
  readonly id: string;
  readonly summary: string;
  readonly description: string;
  readonly method: HttpMethod;
  readonly path: string;
  readonly params: HttpParameter[];
  readonly responses: MethodResponse[];
}

export interface DocumentationState {
  name: string;
  version: string;
  baseUrl: string;
  operations: OperationDocumentation[];
  status: 'LOADING' | 'LOADED' | 'ERROR';
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

export type DocumentationAction = FETCH_SWAGGER_START | FETCH_SWAGGER_SUCCESS | FETCH_SWAGGER_FAIL;
