import { createElement } from 'react';
import Icon from 'src/components/Icon';
import * as style from './style.scss';

interface Props {
  value: string;
  onClick: (value: string) => void;
  iconRef: string;
  iconClassName: string;
}

function DocExample(props: Props) {
  const { value, onClick, iconRef, iconClassName } = props;
  const onClickButton = () => onClick(value);

  return (
    <button className={style.container} onClick={onClickButton}>
      <Icon href={iconRef} className={iconClassName} />
    </button>
  );
}

export default DocExample;
