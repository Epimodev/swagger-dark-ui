interface Info {
  version: string;
  title: string;
  description: string;
}

interface SecurityDefinitions {
  [x: string]: {
    name: string;
    type: string;
    in: ParamIn;
  };
}

declare type HttpMethod = 'get' | 'post' | 'put' | 'delete';

type ParamIn = 'header' | 'query' | 'path' | 'body';

declare type ParamType = 'string' | 'integer' | 'number' | 'object' | 'array' | 'boolean' | 'null';

interface HttpParameter {
  name: string;
  in: ParamIn;
  type?: ParamType;
  required?: boolean;
  description?: string;
  schema?: (JsonDefinition | RefDefinition) & { example?: any };
  default?: string;
}

declare type RefDefinition = {
  $ref: string;
  type?: undefined;
};

type ArrayDefinition = {
  $ref?: undefined;
  type: 'array';
  description?: string;
  items?: JsonDefinition;
};

type ObjectDefinition = {
  $ref?: undefined;
  type: 'object';
  description?: string;
  properties?: { [key: string]: JsonDefinition };
};

type PrimitiveDefinition = {
  $ref?: undefined;
  type: 'string' | 'integer' | 'number' | 'boolean';
  description?: string;
};

declare type JsonDefinition = ArrayDefinition | ObjectDefinition | PrimitiveDefinition;

declare interface OperationResponse {
  description?: string;
  schema: JsonDefinition | RefDefinition;
  examples?: {
    ['application/json']: object | array<object>;
  };
}

declare interface ApiPathMethod {
  operationId: string;
  summary: string;
  tags: string[];
  description: string;
  produces: string[];
  parameters: HttpParameter[];
  responses: {
    [x: string]: OperationResponse;
  };
}

declare interface ApiPath {
  parameters?: HttpParameter[];
  get?: ApiPathMethod;
  post?: ApiPathMethod;
  put?: ApiPathMethod;
  delete?: ApiPathMethod;
}

interface ApiPaths {
  [x: string]: ApiPath;
}

declare interface SwaggerSchema {
  swagger: string;
  info: Info;
  host: string;
  basePath: string;
  schemes: string[];
  securityDefinitions: SecurityDefinitions;
  paths: ApiPaths;
  [x: string]: any;
}
