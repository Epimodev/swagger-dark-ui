import { createElement } from 'react';
import * as classnames from 'classnames';
import * as style from './style.scss';

interface Props {
  children: string;
  type: ParamType;
  className?: string;
}

const typeClassMap = {
  string: style.type_string,
  integer: style.type_integer,
  number: style.type_number,
  object: style.type_object,
  array: style.type_array,
  boolean: style.type_boolean,
  null: style.type,
};

function TypeLabel(props: Props) {
  const { children, type, className = '' } = props;
  const typeClass = classnames(style.type, typeClassMap[type], className);

  return <span className={typeClass}>{children}</span>;
}

export default TypeLabel;
