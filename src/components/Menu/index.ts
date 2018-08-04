import { connect } from 'react-redux';
import { StoreState } from 'src/store';
import { setFilter } from 'src/store/actions/documentation';
import MenuView from './view';
import { selectRessources } from './utils';
import { MenuRessource } from './types';

interface StoreProps {
  docName: string;
  docVersion: string;
  ressources: MenuRessource[];
  filterValue: string;
}

interface DispatchProps {
  setFilter: (value: string) => void;
}

function mapStateToProps(state: StoreState): StoreProps {
  return {
    docName: state.documentation.name,
    docVersion: state.documentation.version,
    ressources: selectRessources(state),
    filterValue: state.documentation.filterQuery,
  };
}

const dispatchToProps: DispatchProps = {
  setFilter,
};

export default connect(mapStateToProps, dispatchToProps)(MenuView);
