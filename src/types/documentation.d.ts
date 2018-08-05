export interface MethodResponse {
  code: number;
  description: string;
  schema: ResponseSchema;
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
  schema: ResponseSchema;
  example: any;
}
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
