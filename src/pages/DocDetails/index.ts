import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import { OperationDocumentation } from 'src/types/documentation';
import DocDetailsView, { Props } from './view';

interface StoreProps {
  operation: OperationDocumentation | undefined;
}

function mapStateToProps(state: StoreState, props: Props): StoreProps {
  const operation = state.documentation.operations.find(
    ({ id }) => id === props.match.params.operationId,
  );

  return {
    operation,
  };
}

export default connect(mapStateToProps)(DocDetailsView);
