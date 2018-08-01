import { createElement } from 'react';
import * as style from './style.scss';

function OrSeparator() {
  return (
    <div className={style.container}>
      <hr className={style.line} />
      <span className={style.word}>or</span>
      <hr className={style.line} />
    </div>
  );
}

export default OrSeparator;
