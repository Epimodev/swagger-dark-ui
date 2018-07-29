import fuzzysearch from 'src/utils/fuzzysearch';
import { OperationDocumentation } from 'src/App/types';
import { MenuRessource } from './types';

function filterOperations(
  query: string,
  operations: OperationDocumentation[],
): OperationDocumentation[] {
  if (query) {
    return operations.filter(operation => fuzzysearch(query, operation.path));
  }
  return operations;
}

function getMenuRessources(operations: OperationDocumentation[]): MenuRessource[] {
  return [];
}

export { filterOperations, getMenuRessources };
