import { MethodDocumentation } from './types';

function getBaseUrl(apiDoc: SwaggerSchema): string {
  console.log('apiDoc.host');
  console.log(apiDoc.host);
  if (apiDoc.schemes[0]) {
    return `${apiDoc.schemes[0]}://${apiDoc.host}${apiDoc.basePath}`;
  }
  return `${apiDoc.host}${apiDoc.basePath}`;
}

function getMethods(apiDoc: SwaggerSchema): MethodDocumentation[] {
  return [];
}

export { getBaseUrl, getMethods };
