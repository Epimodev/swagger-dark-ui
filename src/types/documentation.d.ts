export interface MethodResponse {
  code: number;
  description: string;
  schema: Schema;
  example: any;
}

export interface ParamDocumentation {
  name: string;
  type: ParamType;
  required: boolean;
}

export interface ParamsDocumentation {
  header: ParamDocumentation[];
  query: ParamDocumentation[];
  path: ParamDocumentation[];
}

export interface BodyDocumentation {
  schema: Schema;
  example: any;
}

export type ArraySchema = {
  type: 'array';
  description: string;
  items: Schema;
};

export type ObjectSchema = {
  type: 'object';
  description: string;
  properties: { name: string; schema: Schema }[];
};

export type PrimitiveSchema = {
  type: 'string' | 'integer' | 'number' | 'boolean' | 'null';
  description: string;
};

export type Schema = ArraySchema | ObjectSchema | PrimitiveSchema;
export interface OperationDocumentation {
  id: string;
  summary: string;
  description: string;
  method: HttpMethod;
  path: string;
  params: ParamsDocumentation;
  body: BodyDocumentation | null;
  responses: MethodResponse[];
}
