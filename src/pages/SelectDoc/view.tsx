import { createElement } from 'react';
import classnames from 'classnames';
import * as isUrl from 'validator/lib/isURL';
import Loader from 'src/components/Loader';
import Error from 'src/components/Error';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import Dropzone from 'src/components/Dropzone';
import Icon from 'src/components/Icon';
import jsonIcon from 'src/icons/json.svg';
import tactillIcon from 'src/icons/tactill.svg';
import giphyIcon from 'src/icons/giphy.svg';
import OrSeparator from './components/OrSeparator';
import DocExemple from './components/DocExemple';
import * as style from './style.scss';

export interface Props {
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
  dropzoneStatus: 'EMPTY' | 'BAD_FORMAT';
  url: string;
  readJsonFile: (file: File) => void;
  updateUrl: (value: string) => void;
  fetchUserUrl: () => void;
  fetchApiExemple: (exampleValue: string) => void;
  resetApp: () => void;
}

function SelectDocView(props: Props) {
  const {
    status,
    dropzoneStatus,
    url,
    readJsonFile,
    updateUrl,
    fetchUserUrl,
    fetchApiExemple,
    resetApp,
  } = props;
  const isUrlInvalid = !isUrl(url);
  const isLoading = status === 'LOADING';
  const hasError = status === 'ERROR';
  const isLoaded = status === 'LOADED';
  const cardClassName = classnames(style.card, {
    [style.card_blurred]: isLoading || isLoaded || hasError,
  });

  return (
    <div className={style.container}>
      <Error displayed={hasError} onClose={resetApp} />
      <Loader displayed={isLoading} />
      <div className={cardClassName}>
        <div>
          <h2 className={style.optionTitle}>Drop Swagger file here</h2>
          <div className={style.dropZoneContainer}>
            <Dropzone onChange={readJsonFile} accept="application/json">
              {({ isOver, focused }) => {
                const zoneClass = classnames(style.dropZone, {
                  [style.dropZone_isOver]: isOver,
                  [style.dropZone_focused]: focused,
                  [style.dropZone_error]: !isOver && dropzoneStatus === 'BAD_FORMAT',
                });
                return (
                  <div className={zoneClass}>
                    <Icon href={jsonIcon} className={style.jsonIcon} />
                    <span className={style.dropZoneMessage}>Drop file</span>
                    <span className={style.dropZoneErrorMessage}>Bad file format</span>
                  </div>
                );
              }}
            </Dropzone>
          </div>
        </div>
        <OrSeparator />
        <div>
          <h2 className={style.optionTitle}>Write Swagger file url</h2>
          <div className={style.urlOptionContainer}>
            <div className={style.inputContainer}>
              <Input placeholder="https://swagger-file.json" value={url} onChange={updateUrl} />
            </div>
            <Button onClick={fetchUserUrl} disabled={isUrlInvalid}>
              LOAD FILE
            </Button>
          </div>
        </div>
        <OrSeparator />
        <div>
          <h2 className={style.optionTitle}>Select one of thoses examples</h2>
          <div className={style.examplesContainer}>
            <DocExemple
              value="tactill"
              onClick={fetchApiExemple}
              iconRef={tactillIcon}
              iconClassName={style.tactillIcon}
            />
            <DocExemple
              value="giphy"
              onClick={fetchApiExemple}
              iconRef={giphyIcon}
              iconClassName={style.giphyIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectDocView;
