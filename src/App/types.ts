interface MethodDocumentation {
  readonly method: HttpMethod;
  readonly path: string;
}

export interface DocumentationState {
  name: string;
  version: string;
  basePath: string;
  methods: MethodDocumentation[];
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
