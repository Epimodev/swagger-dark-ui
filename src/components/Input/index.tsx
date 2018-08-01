import { createElement, SyntheticEvent } from 'react';
import * as classnames from 'classnames';
import * as style from './style.scss';

interface Props {
  placeholder: string;
  value: string;
  onChange: (event: SyntheticEvent<HTMLInputElement>) => void;
  className?: string;
}

function MethodLabel(props: Props) {
  const { placeholder, value, onChange, className = '' } = props;
  const inputClass = classnames(style.input, className);

  return (
    <input
      type="text"
      className={inputClass}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default MethodLabel;
