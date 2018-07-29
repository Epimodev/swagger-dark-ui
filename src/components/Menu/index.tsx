import { connect } from 'preact-redux';
import { StoreState } from 'src/store';
import MenuView from './view';
import { selectRessources } from './utils';
import { setFilter } from './actions';
import { MenuRessource } from './types';

interface StoreProps {
  docName: string;
  docVersion: string;
  ressources: MenuRessource[];
  filterValue: string;
}

interface DispatchProps {
  setFilter: (event: Event) => void;
}

function mapStateToProps(state: StoreState): StoreProps {
  return {
    docName: state.name,
    docVersion: state.version,
    ressources: selectRessources(state),
    filterValue: state.filterQuery,
  };
}

const dispatchToProps: DispatchProps = {
  setFilter,
};

export default connect(mapStateToProps, dispatchToProps)(MenuView);
