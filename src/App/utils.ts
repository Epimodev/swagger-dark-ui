import { OperationDocumentation, MethodResponse } from './types';

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

  return paths.reduce(
    (operations, path) => {
      const pathDefinition: ApiPath = apiDoc.paths[path] as ApiPath;
      const pathKeys: string[] = Object.keys(pathDefinition) as string[];
      const pathMethods: HttpMethod[] = pathKeys.filter(isHttpMethod) as HttpMethod[];

      const pathOperations: OperationDocumentation[] = pathMethods.map(method => {
        const pathMethod: ApiPathMethod = pathDefinition[method] as ApiPathMethod;
        const responses = formatResponses(pathMethod.responses);
        return {
          method,
          path,
          responses,
          id: pathMethod.operationId,
          summary: pathMethod.summary,
          description: pathMethod.description,
          params: pathMethod.parameters,
        };
      });

      return [...operations, ...pathOperations];
    },
    [] as OperationDocumentation[],
  );
}

export { getBaseUrl, getOperations };
