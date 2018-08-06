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

declare type ParamType = 'string' | 'integer' | 'number' | 'object' | 'array' | 'boolean';

interface HttpParameter {
  name: string;
  in: ParamIn;
  type?: ParamType;
  required?: boolean;
  description?: string;
  schema?: ResponseSchema & { example?: any };
  default?: string;
}

type ArraySchema = {
  type: 'array';
  description?: string;
  items?: ResponseSchema;
};

type ObjectSchema = {
  type: 'object';
  description?: string;
  properties?: { [key: string]: ResponseSchema };
};

type PrimitiveSchema = {
  type: 'string' | 'integer' | 'number' | 'boolean';
  description?: string;
};

declare type ResponseSchema = ArraySchema | ObjectSchema | PrimitiveSchema;

declare interface OperationResponse {
  description: string;
  schema: ResponseSchema;
  examples: {
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
}
