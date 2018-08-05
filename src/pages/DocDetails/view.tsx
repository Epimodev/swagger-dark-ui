import { createElement } from 'react';
import { Redirect, match as Match } from 'react-router-dom';
import { OperationDocumentation } from 'src/types/documentation';
import Description from 'src/components/Description';
import OperationPath from './components/OperationPath';
import ParamsDoc from './components/ParamsDoc';
import ResponsesDoc from './components/ResponsesDoc';
import * as style from './style.scss';

export interface Props {
  match: Match<{ operationId: string }>;
  operation?: OperationDocumentation;
}

function DocDetailsView(props: Props) {
  const { operation } = props;

  if (!operation) {
    return <Redirect to="/" />;
  }

  const { id, summary, description, method, path, params, body, responses } = operation;

  console.log(body);

  return (
    <div className={style.container}>
      <OperationPath method={method} path={path} />
      <div className={style.content}>
        {summary && <div className={style.summary}>{summary}</div>}
        {description && <Description className={style.description}>{description}</Description>}
        <hr className={style.separator} />
        <ParamsDoc title="Header Params" params={params.header} />
        <ParamsDoc title="Query Params" params={params.query} />
        <ParamsDoc title="Path Params" params={params.path} />
        <ResponsesDoc key={id} title="Responses" responses={responses} />
      </div>
    </div>
  );
}

export default DocDetailsView;
