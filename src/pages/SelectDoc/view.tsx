import { createElement } from 'react';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
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
          <div className={style.urlOptionContainer}>
            <div className={style.inputContainer}>
              <Input
                placeholder="https://swagger-file.json"
                value=""
                onChange={() => console.log('Change')}
              />
            </div>
            <Button onClick={() => console.log('LOAD FILE')}>LOAD FILE</Button>
          </div>
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
