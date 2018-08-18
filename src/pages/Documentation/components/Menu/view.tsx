import { createElement } from 'react';
import { Redirect } from 'react-router-dom';
import { MenuRessource } from './types';
import Input from 'src/components/Input';
import Ressource from './components/Ressource';
import * as style from './style.scss';

export interface Props {
  docName: string;
  docVersion: string;
  ressources: MenuRessource[];
  filterValue: string;
  setFilter: (value: string) => void;
  pathname: string;
}

function Menu(props: Props) {
  const { docName, docVersion, ressources, filterValue, setFilter, pathname } = props;

  return (
    <div className={style.container}>
      {pathname === '/' && <Redirect to={`/operation/${ressources[0].operations[0].id}`} />}
      <div>
        <span className={style.docName}>{docName}</span>
        <span className={style.docVersion}>v{docVersion}</span>
      </div>
      <Input value={filterValue} onChange={setFilter} placeholder="Filter endpoints" />
      {ressources.map(ressource => (
        <Ressource key={ressource.name} {...ressource} />
      ))}
    </div>
  );
}

export default Menu;
