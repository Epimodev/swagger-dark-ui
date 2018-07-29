import getOr = require('lodash/fp/getOr');
import { OperationDocumentation, MethodResponse } from './types';

function getBaseUrl(apiDoc: SwaggerSchema): string {
  if (apiDoc.schemes[0]) {
    return `${apiDoc.schemes[0]}://${apiDoc.host}${apiDoc.basePath}`;
  }
  return `${apiDoc.host}${apiDoc.basePath}`;
}

function formatResponses(docResponses: { [x: string]: OperationResponse }): MethodResponse[] {
  const httpCodes = Object.keys(docResponses);
  return httpCodes.map(code => {
    const docResponse = docResponses[code];

    const example = getOr(null, 'examples.application/json.data', docResponse);

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
      const pathMethods: HttpMethod[] = Object.keys(pathDefinition) as HttpMethod[];
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
