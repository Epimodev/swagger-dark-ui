import { h } from 'preact';
import { connect } from 'preact-redux';
import { StoreState } from 'src/store';
import AppView from './view';
import { fetchApiDocumentation } from './actions';

interface StoreProps {
  status: 'LOADING' | 'LOADED' | 'ERROR';
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

function render(props: StoreProps & DispatchProps) {
  return <AppView {...props} />;
}

export default connect(mapStateToProps, dispatchToProps)(render);
