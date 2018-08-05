import {
  OperationDocumentation,
  MethodResponse,
  ParamDocumentation,
  ParamsDocumentation,
  BodyDocumentation,
} from 'src/types/documentation';

const HTTP_METHODS = ['get', 'post', 'put', 'delete'];

function isHttpMethod(value: string): boolean {
  return HTTP_METHODS.indexOf(value) >= 0;
}

function getBaseUrl(apiDoc: SwaggerSchema): string {
  if (apiDoc.schemes[0]) {
    return `${apiDoc.schemes[0]}://${apiDoc.host}${apiDoc.basePath}`;
  }
  return `${apiDoc.host}${apiDoc.basePath}`;
}

function getExample(response: OperationResponse): any {
  if (!response.examples) {
    return null;
  }
  if (!response.examples['application/json']) {
    return null;
  }
  if (!response.examples['application/json'].data) {
    return null;
  }
  return response.examples['application/json'].data;
}

function formatParams(
  params: HttpParameter[],
  currentParams: ParamsDocumentation,
): ParamsDocumentation {
  return params.reduce((result, param) => {
    const paramToPush: ParamDocumentation = {
      name: param.name,
      required: param.required || false,
      type: param.type || 'string',
    };
    switch (param.in) {
      case 'header':
        return {
          ...result,
          header: [...result.header, paramToPush],
        };
      case 'query':
        return {
          ...result,
          query: [...result.query, paramToPush],
        };
      case 'path':
        return {
          ...result,
          path: [...result.path, paramToPush],
        };
    }
    return result;
  }, currentParams);
}

function getBodyDocumentation(params: HttpParameter[]): BodyDocumentation | null {
  const bodyParam = params.find(param => param.in === 'body');

  if (bodyParam && bodyParam.schema) {
    const { example, ...schema } = bodyParam.schema;
    return {
      schema,
      example: example || null,
    };
  }

  return null;
}

function formatResponses(docResponses: { [x: string]: OperationResponse }): MethodResponse[] {
  const httpCodes = Object.keys(docResponses);
  return httpCodes.map(code => {
    const docResponse = docResponses[code];

    const example = getExample(docResponse);

    return {
      example,
      code: parseInt(code, 10),
      description: docResponse.description,
      schema: docResponse.schema,
    };
  });
}

function getOperations(apiDoc: SwaggerSchema): OperationDocumentation[] {
  const paths = Object.keys(apiDoc.paths);
  const initialParams: ParamsDocumentation = {
    header: [],
    path: [],
    query: [],
  };

  return paths.reduce(
    (operations, path) => {
      const pathDefinition: ApiPath = apiDoc.paths[path] as ApiPath;
      const pathKeys: string[] = Object.keys(pathDefinition) as string[];
      const pathMethods: HttpMethod[] = pathKeys.filter(isHttpMethod) as HttpMethod[];

      const pathParameters = pathDefinition.parameters ? pathDefinition.parameters : [];
      const pathParams = formatParams(pathParameters, initialParams);

      const pathOperations: OperationDocumentation[] = pathMethods.map(method => {
        const pathMethod: ApiPathMethod = pathDefinition[method] as ApiPathMethod;
        const params = formatParams(pathMethod.parameters, pathParams);
        const body = getBodyDocumentation(pathMethod.parameters);
        const responses = formatResponses(pathMethod.responses);
        return {
          method,
          path,
          responses,
          params,
          body,
          id: pathMethod.operationId,
          summary: pathMethod.summary,
          description: pathMethod.description,
        };
      });

      return [...operations, ...pathOperations];
    },
    [] as OperationDocumentation[],
  );
}

export { getBaseUrl, getOperations };
