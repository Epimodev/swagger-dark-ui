import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import AppView from './view';

interface StoreProps {
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
}

function mapStateToProps(state: StoreState): StoreProps {
  return {
    status: state.selection.status,
  };
}

export default connect(mapStateToProps)(AppView);
