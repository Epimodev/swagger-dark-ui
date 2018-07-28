import { connect } from 'preact-redux';
import { StoreState } from 'src/store';
import MenuView from './view';
import { getMenuRessources } from './utils';
import { MenuRessource } from './types';

interface StoreProps {
  docName: string;
  docVersion: string;
  ressources: MenuRessource[];
}

function mapStateToProps(state: StoreState): StoreProps {
  return {
    docName: state.name,
    docVersion: state.version,
    ressources: getMenuRessources(state.operations),
  };
}

export default connect(mapStateToProps)(MenuView);
