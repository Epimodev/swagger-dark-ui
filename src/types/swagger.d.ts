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

interface Parameter {
  name: string;
  in: ParamIn;
  required: boolean;
  type: ParamType;
  default?: string;
}

type ArraySchema = {
  type: 'array';
  items: Schema;
};

type ObjectSchema = {
  type: 'object';
  properties: Schema;
};

type PrimitiveSchema = {
  type: 'string' | 'integer' | 'number' | 'boolean';
};

type Schema = ArraySchema | ObjectSchema | PrimitiveSchema;

interface Response {
  description: string;
  schema: Schema;
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
      parameters: Parameter[];
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
