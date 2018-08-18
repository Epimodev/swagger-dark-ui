import { createElement } from 'react';
import * as style from './style.scss';

export interface Props {
  children: string;
}

function DetailsTitle(props: Props) {
  return <h3 className={style.title}>{props.children}</h3>;
}

export default DetailsTitle;
