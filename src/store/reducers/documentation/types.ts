import { OperationDocumentation } from 'src/types/documentation';

export interface DocumentationState {
  name: string;
  version: string;
  baseUrl: string;
  operations: OperationDocumentation[];
}
