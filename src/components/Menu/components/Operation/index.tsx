import { h } from 'preact';
import * as classnames from 'classnames';
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
    value: { method, path },
  } = props;
  const methodClass = classnames(style.method, methodClassMap[method]);

  return (
    <div className={style.container}>
      <span className={methodClass}>{method}</span>
      <span className={style.path}>{path}</span>
    </div>
  );
}

export default Operation;
