import { createElement } from 'react';
import { MenuRessource } from '../../types';
import Operation from '../Operation';
import * as style from './style.scss';

function Ressource(props: MenuRessource) {
  const { name, operations } = props;

  return (
    <div className={style.container}>
      <div className={style.name}>{name}</div>
      <div className={style.operations}>
        <hr className={style.operationsLine} />
        {operations.map(operation => <Operation {...operation} />)}
      </div>
    </div>
  );
}

export default Ressource;
