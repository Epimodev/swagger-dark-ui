import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import { OperationDocumentation } from 'src/types/documentation';
import DetailsView, { Props } from './view';

interface StoreProps {
  operation: OperationDocumentation | undefined;
}

// variable use to keep details content during out animation
let lastOperationId = '';

function mapStateToProps(state: StoreState, props: Props): StoreProps {
  const operations = state.documentation ? state.documentation.operations : [];
  const operationId = props.match ? props.match.params.operationId : lastOperationId;
  lastOperationId = operationId;

  const operation = operations.find(({ id }) => id === operationId);

  return {
    operation,
  };
}

export default connect(mapStateToProps)(DetailsView);
