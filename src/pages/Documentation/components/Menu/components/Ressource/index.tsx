import { createElement } from 'react';
import { MenuRessource } from '../../types';
import Operation from '../Operation';
import * as style from './style.scss';

interface Props extends MenuRessource {
  isTablet: boolean;
}

function Ressource(props: Props) {
  const { name, operations, isTablet } = props;

  return (
    <div className={style.container}>
      <div className={style.name}>{name}</div>
      <div className={style.operations}>
        <hr className={style.operationsLine} />
        {operations.map(operation => (
          <Operation key={operation.id} {...operation} isTablet={isTablet} />
        ))}
      </div>
    </div>
  );
}

export default Ressource;
