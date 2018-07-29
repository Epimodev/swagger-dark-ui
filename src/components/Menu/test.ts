import { OperationDocumentation } from 'src/App/types';
import * as utils from './utils';

const operationBase: OperationDocumentation = {
  id: '',
  summary: '',
  description: '',
  method: 'get',
  path: '/',
  params: [],
  responses: [],
};

describe.only('filterOperations', () => {
  const operations: OperationDocumentation[] = [
    { ...operationBase, id: 'get_streams', path: '/streams' },
    { ...operationBase, id: 'get_stream_by_id', path: '/streams/{id}' },
    { ...operationBase, id: 'get_score', path: '/games/score' },
    { ...operationBase, id: 'get_game_by_id', path: '/games/{id}' },
    { ...operationBase, id: 'get_calendar', path: '/games/calendar' },
  ];

  test('Should return the same list as input', () => {
    expect(utils.filterOperations('', operations)).toBe(operations);
  });

  test('Should return only `score` operation', () => {
    const expectedResult = [operations[2]];

    expect(utils.filterOperations('scoe', operations)).toEqual(expectedResult);
  });

  test('Should return only `streams` operations', () => {
    const expectedResult = [operations[0], operations[1]];

    expect(utils.filterOperations('strm', operations)).toEqual(expectedResult);
  });

  test('Should return only `{id}` operations', () => {
    const expectedResult = [operations[1], operations[3]];

    expect(utils.filterOperations('{id}', operations)).toEqual(expectedResult);
  });
});

describe('getMenuRessources', () => {
  test('Should return empty list', () => {
    const operations: OperationDocumentation[] = [];

    expect(utils.getMenuRessources(operations)).toEqual([]);
  });

  test('Should return 1 ressource with 1 operation', () => {
    const operations: OperationDocumentation[] = [
      { ...operationBase, id: 'get_score', path: '/games/score' },
    ];

    const ressources = utils.getMenuRessources(operations);
    expect(ressources.length).toBe(1);
    expect(ressources[0].name).toBe('games');
    expect(ressources[0].operations.length).toBe(1);
    expect(ressources[0].operations[0].id).toBe('get_score');
    expect(ressources[0].operations[0].value.method).toBe('get');
    expect(ressources[0].operations[0].value.path).toBe('/games/score');
  });

  test('Should return 1 ressource with 2 operations', () => {
    const operations: OperationDocumentation[] = [
      { ...operationBase, id: 'get_score', path: '/games/score' },
      { ...operationBase, id: 'get_calendar', path: '/games/calendar' },
    ];

    const ressources = utils.getMenuRessources(operations);
    expect(ressources.length).toBe(1);
    expect(ressources[0].name).toBe('games');
    expect(ressources[0].operations.length).toBe(2);
    expect(ressources[0].operations[0].id).toBe('get_score');
    expect(ressources[0].operations[1].id).toBe('get_calendar');
  });

  test('Should return 2 ressources with 2 operation', () => {
    const operations: OperationDocumentation[] = [
      { ...operationBase, id: 'get_streams', path: '/streams' },
      { ...operationBase, id: 'get_stream_by_id', path: '/streams/{id}' },
      { ...operationBase, id: 'get_score', path: '/games/score' },
      { ...operationBase, id: 'get_calendar', path: '/games/calendar' },
    ];

    const ressources = utils.getMenuRessources(operations);
    expect(ressources.length).toBe(2);
    expect(ressources[0].name).toBe('streams');
    expect(ressources[1].name).toBe('games');
    expect(ressources[0].operations.length).toBe(2);
    expect(ressources[0].operations[0].id).toBe('get_streams');
    expect(ressources[0].operations[1].id).toBe('get_stream_by_id');
    expect(ressources[1].operations.length).toBe(2);
    expect(ressources[1].operations[0].id).toBe('get_score');
    expect(ressources[1].operations[1].id).toBe('get_calendar');
  });
});
