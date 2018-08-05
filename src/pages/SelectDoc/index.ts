import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import {
  readJsonFile,
  updateUrl,
  fetchUserUrl,
  fetchApiExemple,
} from 'src/store/actions/selection';
import SelectDocView from './view';

interface StoreProps {
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  dropzoneStatus: 'EMPTY' | 'BAD_FORMAT';
  url: string;
}

interface DispatchProps {
  readJsonFile: (file: File) => void;
  updateUrl: (value: string) => void;
  fetchUserUrl: () => void;
  fetchApiExemple: (exampleName: string) => void;
}

function mapStateToProps(state: StoreState): StoreProps {
  return state.selection;
}

const dispatchToProps: DispatchProps = {
  readJsonFile,
  updateUrl,
  fetchUserUrl,
  fetchApiExemple,
};

export default connect(mapStateToProps, dispatchToProps)(SelectDocView);
