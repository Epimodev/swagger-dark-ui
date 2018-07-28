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
            parameters: [],
            responses: {},
          },
        },
        '/gifs/find': {
          post: {
            operationId: 'find_post',
            summary: 'Summary',
            description: 'Description',
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
            responses: {},
          },
          post: {
            operationId: 'search_post',
            summary: 'Summary',
            description: 'Description',
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
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            parameters: [],
            responses: {
              200: {
                description: 'Response description',
                schema: { type: 'string' },
                examples: {
                  'application/json': {
                    data: 'Response example',
                  },
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

  test('Should return 1 method with 2 responses', () => {
    const swaggerSchema = {
      ...SwaggerBaseSchema,
      paths: {
        '/gifs/search': {
          get: {
            operationId: 'search_get',
            summary: 'Summary',
            description: 'Description',
            parameters: [],
            responses: {
              200: {
                description: 'Response description',
                schema: { type: 'string' },
                examples: {
                  'application/json': {
                    data: 'Response example',
                  },
                },
              },
              400: {
                description: 'Bad request description',
                schema: { type: 'string' },
                examples: {
                  'application/json': {
                    data: 'Bad request example',
                  },
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
});
