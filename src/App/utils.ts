import { OperationDocumentation } from './types';

function getBaseUrl(apiDoc: SwaggerSchema): string {
  if (apiDoc.schemes[0]) {
    return `${apiDoc.schemes[0]}://${apiDoc.host}${apiDoc.basePath}`;
  }
  return `${apiDoc.host}${apiDoc.basePath}`;
}

function getOperations(apiDoc: SwaggerSchema): OperationDocumentation[] {
  return [];
}

export { getBaseUrl, getOperations };
