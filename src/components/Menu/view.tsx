import { createElement, SyntheticEvent } from 'react';
import { MenuRessource } from './types';
import Ressource from './components/Ressource';
import * as style from './style.scss';

export interface Props {
  docName: string;
  docVersion: string;
  ressources: MenuRessource[];
  filterValue: string;
  setFilter: (event: SyntheticEvent<HTMLInputElement>) => void;
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
        onChange={setFilter}
        placeholder="Filter endpoints"
        className={style.filterInput}
      />
      {ressources.map(ressource => <Ressource key={ressource.name} {...ressource} />)}
    </div>
  );
}

export default Menu;
