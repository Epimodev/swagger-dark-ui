import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import AppView from './view';
import { fetchApiDocumentation } from './actions';

interface StoreProps {
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
}

interface DispatchProps {
  fetchApiDocumentation: () => void;
}

function mapStateToProps(state: StoreState): StoreProps {
  return {
    status: state.status,
  };
}

const dispatchToProps: DispatchProps = {
  fetchApiDocumentation,
};

export default connect(mapStateToProps, dispatchToProps)(AppView);
