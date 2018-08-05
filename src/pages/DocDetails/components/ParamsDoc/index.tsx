import { createElement, Fragment } from 'react';
import { ParamDocumentation } from 'src/types/documentation';
import ParamsList from 'src/components/ParamsList';
import DetailsTitle from '../DetailsTitle';
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
        <DetailsTitle>{title}</DetailsTitle>
        <ParamsList className={style.paramsList} params={params} />
      </Fragment>
    );
  }

  return null;
}

export default ParamsDoc;
