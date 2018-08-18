import { createElement } from 'react';
import { NavLink } from 'react-router-dom';
import MethodLabel from 'src/components/MethodLabel';
import * as style from './style.scss';

interface Props {
  id: string;
  value: {
    method: HttpMethod;
    path: string;
  };
}

function Operation(props: Props) {
  const {
    id,
    value: { method, path },
  } = props;

  return (
    <NavLink
      to={`/operation/${id}`}
      className={style.container}
      activeClassName={style.container_active}
    >
      <MethodLabel method={method} className={style.method} />
      <span className={style.path}>{path}</span>
    </NavLink>
  );
}

export default Operation;
