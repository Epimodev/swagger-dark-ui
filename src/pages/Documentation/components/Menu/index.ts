import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import { OperationDocumentation } from 'src/types/documentation';
import MenuView from './view';

interface StoreProps {
  docName: string;
  docVersion: string;
  operations: OperationDocumentation[];
}

function mapStateToProps(state: StoreState): StoreProps {
  return {
    docName: state.documentation.name,
    docVersion: state.documentation.version,
    operations: state.documentation.operations,
  };
}

export default connect(mapStateToProps)(MenuView);
