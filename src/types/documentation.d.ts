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
  body: ParamDocumentation[];
}
export interface OperationDocumentation {
  id: string;
  summary: string;
  description: string;
  method: HttpMethod;
  path: string;
  params: ParamsDocumentation;
  responses: MethodResponse[];
}
