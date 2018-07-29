import { createElement } from 'react';
import * as classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import * as style from './style.scss';

interface Props {
  id: string;
  value: {
    method: HttpMethod;
    path: string;
  };
}

const methodClassMap = {
  get: style.method_get,
  post: style.method_post,
  put: style.method_put,
  delete: style.method_delete,
};

function Operation(props: Props) {
  const {
    id,
    value: { method, path },
  } = props;
  const methodClass = classnames(style.method, methodClassMap[method]);

  return (
    <NavLink
      to={`/operation/${id}`}
      className={style.container}
      activeClassName={style.container_active}
    >
      <span className={methodClass}>{method}</span>
      <span className={style.path}>{path}</span>
    </NavLink>
  );
}

export default Operation;
