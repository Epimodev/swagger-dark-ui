import { createElement } from 'react';
import * as classnames from 'classnames';
import * as style from './style.scss';

interface Props {
  method: HttpMethod;
  className?: string;
}

const methodClassMap = {
  get: style.method_get,
  post: style.method_post,
  put: style.method_put,
  delete: style.method_delete,
};

function MethodLabel(props: Props) {
  const { method, className = '' } = props;
  const methodClass = classnames(style.method, methodClassMap[method], className);

  return <span className={methodClass}>{method}</span>;
}

export default MethodLabel;
