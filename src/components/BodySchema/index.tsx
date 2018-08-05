import { createElement } from 'react';
import * as style from './style.scss';

export interface Props {
  schema: ResponseSchema;
}

function BodyDoc(props: Props) {
  // const { schema } = props;

  return <div className={style.container}>SCHEMA</div>;
}

export default BodyDoc;
