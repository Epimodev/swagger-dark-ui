import { h } from 'preact';
import { MenuRessource } from './types';
import Ressource from './components/Ressource';
import * as style from './style.scss';

export interface Props {
  docName: string;
  docVersion: string;
  ressources: MenuRessource[];
  filterValue: string;
  setFilter: (event: Event) => void;
}

function Menu(props: Props) {
  const { docName, docVersion, ressources, filterValue, setFilter } = props;

  return (
    <div className={style.container}>
      <div>
        <span className={style.docName}>{docName}</span>
        <span className={style.docVersion}>v{docVersion}</span>
      </div>
      <input
        type="text"
        value={filterValue}
        onInput={setFilter}
        placeholder="Filter endpoints"
        className={style.filterInput}
      />
      {ressources.map(ressource => <Ressource {...ressource} />)}
    </div>
  );
}

export default Menu;
