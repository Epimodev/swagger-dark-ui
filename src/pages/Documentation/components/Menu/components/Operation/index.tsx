import { createElement } from 'react';
import * as classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import MethodLabel from 'src/components/MethodLabel';
import * as style from './style.scss';

interface Props {
  id: string;
  value: {
    method: HttpMethod;
    path: string;
  };
  isTablet: boolean;
}

function Operation(props: Props) {
  const {
    id,
    value: { method, path },
    isTablet,
  } = props;
  const linkClassName = classnames(style.container, {
    [style.container_tablet]: isTablet,
  });

  return (
    <NavLink
      to={`/operation/${id}`}
      className={linkClassName}
      activeClassName={style.container_active}
    >
      <MethodLabel method={method} className={style.method} />
      <span className={style.path}>{path}</span>
    </NavLink>
  );
}

export default Operation;
