import { createElement, Fragment } from 'react';
import { ParamDocumentation } from 'src/App/types';
import ParamsList from 'src/components/ParamsList';
import * as style from './style.scss';

export interface Props {
  title: string;
  params: ParamDocumentation[];
}

function ParamsDoc(props: Props) {
  const { title, params } = props;

  if (params.length > 0) {
    return (
      <Fragment>
        <div className={style.paramsTitle}>{title}</div>
        <ParamsList className={style.paramsList} params={params} />
      </Fragment>
    );
  }

  return null;
}

export default ParamsDoc;
