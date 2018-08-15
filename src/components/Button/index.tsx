import { createElement, ReactNode } from 'react';
import * as classnames from 'classnames';
import * as style from './style.scss';

export interface Props {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

function SelectDocView(props: Props) {
  const { children, onClick, disabled = false, className = '' } = props;
  const handleClick = disabled ? undefined : onClick;
  const buttonClass = classnames(style.button, className, {
    [style.button_disabled]: disabled,
  });

  return (
    <button className={buttonClass} onClick={handleClick}>
      {children}
    </button>
  );
}

export default SelectDocView;
