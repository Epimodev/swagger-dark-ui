import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import { OperationDocumentation } from 'src/types/documentation';
import DetailsView, { Props } from './view';

interface StoreProps {
  operation: OperationDocumentation | undefined;
}

function mapStateToProps(state: StoreState, props: Props): StoreProps {
  const operations = state.documentation ? state.documentation.operations : [];
  const operation = operations.find(({ id }) => id === props.match.params.operationId);

  return {
    operation,
  };
}

export default connect(mapStateToProps)(DetailsView);
