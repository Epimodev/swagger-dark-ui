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

type ParamType = 'string' | 'integer' | 'number' | 'object' | 'array' | 'boolean';

interface HttpParameter {
  name: string;
  in: ParamIn;
  required: boolean;
  type: ParamType;
  default?: string;
}

type ArraySchema = {
  type: 'array';
  items: ResponseSchema;
};

type ObjectSchema = {
  type: 'object';
  properties: ResponseSchema;
};

type PrimitiveSchema = {
  type: 'string' | 'integer' | 'number' | 'boolean';
};

declare type ResponseSchema = ArraySchema | ObjectSchema | PrimitiveSchema;

interface Response {
  description: string;
  schema: ResponseSchema;
  examples: {
    ['application/json']: {
      data: object | array<any>;
    };
  };
}

interface ApiPaths {
  [x: string]: {
    [x: HttpMethod]: {
      operationId: string;
      summary: string;
      tags: string[];
      description: string[];
      produces: string[];
      parameters: HttpParameter[];
      responses: {
        [x: string]: Response;
      };
    };
  };
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
