import * as utils from './utils';

const SwaggerBaseSchema: SwaggerSchema = {
  swagger: '2.0',
  info: {
    version: '1.0',
    title: 'Giphy',
    description: 'Description',
  },
  host: 'api.giphy.com',
  basePath: '/v1',
  schemes: ['http'],
  securityDefinitions: {
    api_key: {
      name: 'api_key',
      type: 'apiKey',
      in: 'query',
    },
  },
  paths: {},
};

const swaggerBaseOperation: ApiPathMethod = {
  operationId: 'search_get',
  summary: 'Summary',
  description: 'Description',
  tags: [],
  produces: [],
  parameters: [],
  responses: {},
};

function createSchemaWithResponse(definition: JsonDefinition): SwaggerSchema {
  return {
    ...SwaggerBaseSchema,
    paths: {
      '/gifs/search': {
        get: {
          ...swaggerBaseOperation,
          responses: {
            // tslint:disable-next-line object-literal-key-quotes
            '200': {
              schema: definition,
            },
          },
        },
      },
    },
  };
}

describe('getBaseUrl', () => {
  test('Should return base url with protocol', () => {
    const swaggerSchema = SwaggerBaseSchema;

    const expectedValue = 'http://api.giphy.com/v1';

    expect(utils.getBaseUrl(swaggerSchema)).toBe(expectedValue);
  });

  test('Should return base url without protocol', () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      schemes: [],
    };

    const expectedValue = 'api.giphy.com/v1';

    expect(utils.getBaseUrl(swaggerSchema)).toBe(expectedValue);
  });
});

describe('Format schema', () => {
  test('Should format response of type `string`', () => {
    const swaggerSchema = createSchemaWithResponse({
      type: 'string',
      description: 'value description',
    });

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'string',
      description: 'value description',
    });
  });

  test('Should format response of type `number`', () => {
    const swaggerSchema = createSchemaWithResponse({
      type: 'number',
      description: 'value description',
    });

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'number',
      description: 'value description',
    });
  });

  test('Should format response of type `integer`', () => {
    const swaggerSchema = createSchemaWithResponse({
      type: 'integer',
      description: 'value description',
    });

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'integer',
      description: 'value description',
    });
  });

  test('Should format response of type `boolean`', () => {
    const swaggerSchema = createSchemaWithResponse({
      type: 'boolean',
      description: 'value description',
    });

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'boolean',
      description: 'value description',
    });
  });

  test('Should format response of type `object`', () => {
    const swaggerSchema = createSchemaWithResponse({
      type: 'object',
      description: 'object description',
      properties: {
        name: { type: 'string', description: 'object name' },
        size: { type: 'number' },
      },
    });

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'object',
      description: 'object description',
      properties: [
        { name: 'name', schema: { type: 'string', description: 'object name' } },
        { name: 'size', schema: { type: 'number', description: '' } },
      ],
    });
  });

  test('Should format response of type `object` without properties', () => {
    const swaggerSchema = createSchemaWithResponse({
      type: 'object',
    });

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'object',
      description: '',
      properties: [],
    });
  });

  test('Should format response of type `array`', () => {
    const swaggerSchema = createSchemaWithResponse({
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'object name' },
          size: { type: 'number' },
        },
      },
    });

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'array',
      description: '',
      items: {
        type: 'object',
        description: '',
        properties: [
          { name: 'name', schema: { type: 'string', description: 'object name' } },
          { name: 'size', schema: { type: 'number', description: '' } },
        ],
      },
    });
  });
});

describe('getOperations', () => {
  test('Should return empty list', () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {},
    };

    expect(utils.getOperations(swaggerSchema)).toEqual([]);
  });

  test("Should return empty list when path hasn't any method", () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {},
      },
    };

    expect(utils.getOperations(swaggerSchema)).toEqual([]);
  });

  test('Should return 1 method', () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {},
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    expect(apiOperations.length).toBe(1);
    expect(apiOperations[0].path).toBe('/gifs/search');
    expect(apiOperations[0].method).toBe('get');
    expect(apiOperations[0].id).toBe('search_get');
  });

  test('Should return 2 methods for 2 paths', () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {},
          },
        },
        '/gifs/find': {
          post: {
            operationId: 'find_post',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {},
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    expect(apiOperations.length).toBe(2);
    expect(apiOperations[0].path).toBe('/gifs/search');
    expect(apiOperations[0].method).toBe('get');
    expect(apiOperations[0].id).toBe('search_get');
    expect(apiOperations[1].path).toBe('/gifs/find');
    expect(apiOperations[1].method).toBe('post');
    expect(apiOperations[1].id).toBe('find_post');
  });

  test('Should return 2 method for 1 path', () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            parameters: [],
            tags: [],
            produces: [],
            responses: {},
          },
          post: {
            operationId: 'search_post',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {},
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    expect(apiOperations.length).toBe(2);
    expect(apiOperations[0].path).toBe('/gifs/search');
    expect(apiOperations[0].method).toBe('get');
    expect(apiOperations[0].id).toBe('search_get');
    expect(apiOperations[1].path).toBe('/gifs/search');
    expect(apiOperations[1].method).toBe('post');
    expect(apiOperations[1].id).toBe('search_post');
  });

  test('Should return 1 method with 0 response', () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {},
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses.length).toBe(0);
  });

  test('Should return 1 method with 1 response', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {
              // tslint:disable-next-line object-literal-key-quotes
              '200': {
                description: 'Response description',
                schema: { type: 'string' },
                examples: {
                  'application/json': 'Response example',
                },
              },
            },
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses.length).toBe(1);
    expect(operationResponses[0].code).toBe(200);
    expect(operationResponses[0].description).toBe('Response description');
    expect(operationResponses[0].example).toBe('Response example');
  });

  test('Should return 1 method with 1 response from $ref', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {
              // tslint:disable-next-line object-literal-key-quotes
              '200': {
                description: 'Response description',
                schema: {
                  $ref: '#/definitions/response_body',
                },
                examples: {
                  'application/json': 'Response example',
                },
              },
            },
          },
        },
      },
      definitions: {
        response_body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'object',
      description: '',
      properties: [
        {
          name: 'name',
          schema: { type: 'string', description: '' },
        },
      ],
    });
  });

  test("Should throw an error because $ref doesn't exist", () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {
              // tslint:disable-next-line object-literal-key-quotes
              '200': {
                description: 'Response description',
                schema: {
                  $ref: '#/definitions/response_test',
                },
                examples: {
                  'application/json': 'Response example',
                },
              },
            },
          },
        },
      },
      definitions: {
        response_body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
        },
      },
    };

    function tryGetOperations() {
      utils.getOperations(swaggerSchema);
    }

    expect(tryGetOperations).toThrow(/\#\/definitions\/response_test/);
  });

  test('Should throw an error because $ref value is invalid', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {
              // tslint:disable-next-line object-literal-key-quotes
              '200': {
                description: 'Response description',
                schema: {
                  $ref: '#/definitions/response_body',
                },
                examples: {
                  'application/json': 'Response example',
                },
              },
            },
          },
        },
      },
      definitions: {
        response_body: {
          test: 'null',
        },
      },
    };

    function tryGetOperations() {
      utils.getOperations(swaggerSchema);
    }

    expect(tryGetOperations).toThrow(/\#\/definitions\/response_body/);
  });

  test('Should get $ref in a $ref', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {
              // tslint:disable-next-line object-literal-key-quotes
              '200': {
                description: 'Response description',
                schema: {
                  $ref: '#/definitions/response_body',
                },
                examples: {
                  'application/json': 'Response example',
                },
              },
            },
          },
        },
      },
      definitions: {
        response_body: {
          type: 'object',
          properties: {
            name: {
              $ref: '#/definitions/validation',
            },
          },
        },
        validation: {
          type: 'array',
          description: 'validation list',
          items: {
            type: 'string',
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses[0].schema).toEqual({
      type: 'object',
      description: '',
      properties: [
        {
          name: 'name',
          schema: {
            type: 'array',
            description: 'validation list',
            items: { type: 'string', description: '' },
          },
        },
      ],
    });
  });

  test('Should throw an error when there is a recursive $ref', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {
              // tslint:disable-next-line object-literal-key-quotes
              '200': {
                description: 'Response description',
                schema: {
                  $ref: '#/definitions/response_body',
                },
                examples: {
                  'application/json': 'Response example',
                },
              },
            },
          },
        },
      },
      definitions: {
        response_body: {
          type: 'object',
          properties: {
            name: {
              $ref: '#/definitions/validation',
            },
          },
        },
        validation: {
          type: 'array',
          description: 'validation list',
          items: {
            $ref: '#/definitions/response_body',
          },
        },
      },
    };

    function tryGetOperations() {
      utils.getOperations(swaggerSchema);
    }

    expect(tryGetOperations).toThrow(/Recursive \$ref/);
  });

  test('Should return 1 method with 2 responses', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {
              // tslint:disable-next-line object-literal-key-quotes
              '200': {
                description: 'Response description',
                schema: { type: 'string' },
                examples: {
                  'application/json': 'Response example',
                },
              },
              // tslint:disable-next-line object-literal-key-quotes
              '400': {
                description: 'Bad request description',
                schema: { type: 'string' },
                examples: {
                  'application/json': 'Bad request example',
                },
              },
            },
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationResponses = apiOperations[0].responses;

    expect(operationResponses.length).toBe(2);
    expect(operationResponses[0].code).toBe(200);
    expect(operationResponses[0].description).toBe('Response description');
    expect(operationResponses[0].example).toBe('Response example');
    expect(operationResponses[1].code).toBe(400);
    expect(operationResponses[1].description).toBe('Bad request description');
    expect(operationResponses[1].example).toBe('Bad request example');
  });

  test('Should return 1 method without parameters', () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {},
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationParams = apiOperations[0].params;

    expect(operationParams.header.length).toBe(0);
    expect(operationParams.query.length).toBe(0);
    expect(operationParams.path.length).toBe(0);
  });

  test('Should return 1 method with parameters', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [
              { in: 'header', name: 'header-param', type: 'string', required: true },
              { in: 'query', name: 'query-param', type: 'string', required: true },
              { in: 'path', name: 'path-param', type: 'string', required: true },
              { in: 'body', name: 'body-param', type: 'string', required: true },
            ],
            responses: {},
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationParams = apiOperations[0].params;

    expect(operationParams.header.length).toBe(1);
    expect(operationParams.header[0].name).toBe('header-param');
    expect(operationParams.query.length).toBe(1);
    expect(operationParams.query[0].name).toBe('query-param');
    expect(operationParams.path.length).toBe(1);
    expect(operationParams.path[0].name).toBe('path-param');
  });
  test('Should return 1 method with parameters from path', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {},
          },
          parameters: [
            { in: 'header', name: 'path-header-param', type: 'string', required: true },
            { in: 'query', name: 'path-query-param', type: 'string', required: true },
            { in: 'path', name: 'path-path-param', type: 'string', required: true },
            { in: 'body', name: 'path-body-param', type: 'string', required: true },
          ],
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationParams = apiOperations[0].params;

    expect(operationParams.header.length).toBe(1);
    expect(operationParams.header[0].name).toBe('path-header-param');
    expect(operationParams.query.length).toBe(1);
    expect(operationParams.query[0].name).toBe('path-query-param');
    expect(operationParams.path.length).toBe(1);
    expect(operationParams.path[0].name).toBe('path-path-param');
  });
  test('Should return 1 method with parameters from path and operation', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [
              { in: 'header', name: 'header-param', type: 'string', required: true },
              { in: 'query', name: 'query-param', type: 'string', required: true },
              { in: 'path', name: 'path-param', type: 'string', required: true },
              { in: 'body', name: 'body-param', type: 'string', required: true },
            ],
            responses: {},
          },
          parameters: [
            { in: 'header', name: 'path-header-param', type: 'string', required: true },
            { in: 'query', name: 'path-query-param', type: 'string', required: true },
            { in: 'path', name: 'path-path-param', type: 'string', required: true },
            { in: 'body', name: 'path-body-param', type: 'string', required: true },
          ],
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    const operationParams = apiOperations[0].params;

    expect(operationParams.header.length).toBe(2);
    expect(operationParams.header[0].name).toBe('path-header-param');
    expect(operationParams.header[1].name).toBe('header-param');
    expect(operationParams.query.length).toBe(2);
    expect(operationParams.query[0].name).toBe('path-query-param');
    expect(operationParams.query[1].name).toBe('query-param');
    expect(operationParams.path.length).toBe(2);
    expect(operationParams.path[0].name).toBe('path-path-param');
    expect(operationParams.path[1].name).toBe('path-param');
  });
  test('Should have body equals to null', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [],
            responses: {},
          },
          parameters: [],
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    expect(apiOperations[0].body).toBe(null);
  });
  test('Should have a body without example', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [
              {
                name: 'body',
                in: 'body',
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                  },
                },
              },
            ],
            responses: {},
          },
          parameters: [],
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    expect(apiOperations[0].body).not.toBe(null);
    expect(apiOperations[0].body!.example).toBe(null);
  });
  test('Should have a body from $ref', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [
              {
                name: 'body',
                in: 'body',
                schema: {
                  $ref: '#/definitions/search_body',
                },
              },
            ],
            responses: {},
          },
          parameters: [],
        },
      },
      definitions: {
        search_body: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
          },
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    expect(apiOperations[0].body).not.toBe(null);
    expect(apiOperations[0].body!.example).toBe(null);
  });
  test('Should have a body with example', () => {
    const swaggerSchema: SwaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            tags: [],
            produces: [],
            parameters: [
              {
                name: 'body',
                in: 'body',
                schema: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                    },
                  },
                  example: {
                    name: 'wave',
                  },
                },
              },
            ],
            responses: {},
          },
          parameters: [],
        },
      },
    };

    const apiOperations = utils.getOperations(swaggerSchema);
    expect(apiOperations[0].body).not.toBe(null);
    expect(apiOperations[0].body!.example).not.toBe(null);
    expect(apiOperations[0].body!.schema).not.toBe(null);
  });
});
