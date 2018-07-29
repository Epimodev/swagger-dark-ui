import { OperationDocumentation } from 'src/App/types';
import { MenuRessource } from './types';

function filterOperations(
  query: string,
  operations: OperationDocumentation[],
): OperationDocumentation[] {
  return [];
}

function getMenuRessources(operations: OperationDocumentation[]): MenuRessource[] {
  return [];
}

export { filterOperations, getMenuRessources };
