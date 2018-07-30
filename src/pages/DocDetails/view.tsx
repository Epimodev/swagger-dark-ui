import { createElement } from 'react';
import { Redirect, match as Match } from 'react-router-dom';
import { OperationDocumentation } from 'src/App/types';
import Description from 'src/components/Description';
import OperationPath from './components/OperationPath';
import * as style from './style.scss';

export interface Props {
  match: Match<{ operationId: string }>;
  operation: OperationDocumentation | undefined;
}

function DocDetailsView(props: Props) {
  const { operation } = props;

  console.log(operation);

  if (!operation) {
    return <Redirect to="/" />;
  }

  const { summary, description, method, path } = operation;

  return (
    <div className={style.container}>
      {summary && <div className={style.title}>{summary}</div>}
      <OperationPath method={method} path={path} />
      {description && <Description className={style.description}>{description}</Description>}
      <hr className={style.separator} />
    </div>
  );
}

export default DocDetailsView;