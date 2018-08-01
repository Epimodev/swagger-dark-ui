import { createElement } from 'react';
import OrSeparator from './OrSeparator';
import * as style from './style.scss';

export interface Props {}

function SelectDocView(props: Props) {
  return (
    <div className={style.container}>
      <div className={style.card}>
        <div>
          <h2 className={style.optionTitle}>Drop Swagger file here</h2>
        </div>
        <OrSeparator />
        <div>
          <h2 className={style.optionTitle}>Write Swagger file url</h2>
        </div>
        <OrSeparator />
        <div>
          <h2 className={style.optionTitle}>Select one of thoses examples</h2>
        </div>
      </div>
    </div>
  );
}

export default SelectDocView;
