import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import SelectDocView from './view';

interface StoreProps {
  dropzoneStatus: 'EMPTY' | 'BAD_FORMAT';
  url: string;
}

function mapStateToProps(state: StoreState): StoreProps {
  return state.selection;
}

export default connect(mapStateToProps)(SelectDocView);
