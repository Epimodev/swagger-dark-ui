import {
  OperationDocumentation,
  MethodResponse,
  ParamDocumentation,
  ParamsDocumentation,
  BodyDocumentation,
  Schema,
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
  return response.examples['application/json'];
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

function getBodyDocumentation(
  params: HttpParameter[],
  apiDoc: SwaggerSchema,
): BodyDocumentation | null {
  const bodyParam = params.find(param => param.in === 'body');

  if (bodyParam && bodyParam.schema) {
    const { example, ...schema } = bodyParam.schema;
    const bodySchema = getSchema(schema, apiDoc, []);
    return {
      schema: bodySchema,
      example: example || null,
    };
  }

  return null;
}

function formatResponses(
  docResponses: { [x: string]: OperationResponse },
  apiDoc: SwaggerSchema,
): MethodResponse[] {
  const httpCodes = Object.keys(docResponses);
  return httpCodes.map(code => {
    const docResponse = docResponses[code];

    const schema = getSchema(docResponse.schema, apiDoc, []);
    const example = getExample(docResponse);

    return {
      example,
      schema,
      code: parseInt(code, 10),
      description: docResponse.description || '',
    };
  });
}

function findRef(result: any, pathKeys: string[]): any {
  const [key, ...nextKeys] = pathKeys;

  if (!result[key]) {
    return undefined;
  }

  if (nextKeys.length > 0) {
    return findRef(result[key], nextKeys);
  }

  return result[key];
}

function getRef($ref: string, apiDoc: SwaggerSchema): JsonDefinition {
  const typeKeys = ['string', 'number', 'integer', 'object', 'array'];
  const pathKeys = $ref.replace('#/', '').split('/');

  const definition = findRef(apiDoc, pathKeys);

  if (!definition) {
    throw new Error(`$ref ${$ref} didn't exists in api documentation`);
  }

  if (typeKeys.indexOf(definition.type) < 0) {
    throw new Error(`$ref ${$ref} isn't a valid type definition`);
  }

  return definition;
}

function getSchema(
  definition: JsonDefinition | RefDefinition,
  apiDoc: SwaggerSchema,
  refStack: string[],
): Schema {
  if (definition.$ref) {
    if (refStack.indexOf(definition.$ref) >= 0) {
      throw new Error(`Recursive $ref : ${refStack}`);
    }
    const refDefinition = getRef(definition.$ref, apiDoc);
    const newRefStack = [...refStack, definition.$ref];
    return formatSchema(refDefinition, apiDoc, newRefStack);
  }

  if (definition.type) {
    return formatSchema(definition, apiDoc, refStack);
  }

  return { type: 'null', description: '' };
}

function formatObjectProperties(
  properties: {
    [key: string]: JsonDefinition;
  },
  apiDoc: SwaggerSchema,
  refStack: string[],
): { name: string; schema: Schema }[] {
  return Object.keys(properties).map(key => ({
    name: key,
    schema: formatSchema(properties[key], apiDoc, refStack),
  }));
}

function formatSchema(
  definition: JsonDefinition | RefDefinition,
  apiDoc: SwaggerSchema,
  refStack: string[],
): Schema {
  switch (definition.type) {
    case 'string':
    case 'number':
    case 'integer':
    case 'boolean':
      return {
        type: definition.type,
        description: definition.description || '',
      };
    case 'object':
      return {
        type: definition.type,
        description: definition.description || '',
        properties: definition.properties
          ? formatObjectProperties(definition.properties, apiDoc, refStack)
          : [],
      };
    case 'array':
      return {
        type: definition.type,
        description: definition.description || '',
        items: definition.items
          ? formatSchema(definition.items, apiDoc, refStack)
          : { type: 'null', description: '' },
      };
    default:
      return getSchema(definition, apiDoc, refStack);
  }
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
        const body = getBodyDocumentation(pathMethod.parameters, apiDoc);
        const responses = formatResponses(pathMethod.responses, apiDoc);
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
