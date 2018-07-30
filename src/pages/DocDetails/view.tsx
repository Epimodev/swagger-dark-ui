import { createElement } from 'react';
import { Redirect, match as Match } from 'react-router-dom';
import { OperationDocumentation } from 'src/App/types';
import OperationPath from './components/OperationPath';
import * as style from './style.scss';

export interface Props {
  match: Match<{ operationId: string }>;
  operation: OperationDocumentation | undefined;
}

function DocDetailsView(props: Props) {
  const { operation } = props;

  if (!operation) {
    return <Redirect to="/" />;
  }

  return (
    <div className={style.container}>
      <OperationPath method={operation.method} path={operation.path} />
    </div>
  );
}

export default DocDetailsView;
