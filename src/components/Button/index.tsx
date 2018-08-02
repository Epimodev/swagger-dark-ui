import { createElement, ReactNode } from 'react';
import * as classnames from 'classnames';
import * as style from './style.scss';

export interface Props {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

function SelectDocView(props: Props) {
  const { children, onClick, className = '' } = props;
  const buttonClass = classnames(style.button, className);

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default SelectDocView;
