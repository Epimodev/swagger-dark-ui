import { createElement } from 'react';
import * as classnames from 'classnames';
import * as style from './style.scss';

export interface Props {
  code: number;
  selected: boolean;
  index: number;
  onClick: (index: number) => void;
}

function CodeTab(props: Props) {
  const { code, selected, index, onClick } = props;
  const containerClassName = classnames(style.container, {
    [style.container_selected]: selected,
  });
  const squareClassName = classnames(style.square, {
    [style.square_error]: code >= 300,
  });
  const handleClick = () => onClick(index);

  return (
    <button className={containerClassName} onClick={handleClick}>
      <div className={squareClassName} />
      <span className={style.code}>{code}</span>
    </button>
  );
}

export default CodeTab;
