import { createElement } from 'react';
import { Redirect, Link, match as Match } from 'react-router-dom';
import { OperationDocumentation } from 'src/types/documentation';
import Description from 'src/components/Description';
import BodyDoc from 'src/components/BodyDoc';
import Icon from 'src/components/Icon';
import arrowIcon from 'src/icons/left-arrow.svg';
import DetailsTitle from '../../components/DetailsTitle';
import OperationPath from '../../components/OperationPath';
import ParamsDoc from '../../components/ParamsDoc';
import ResponsesDoc from '../../components/ResponsesDoc';
import * as style from './style.scss';

export interface Props {
  match: Match<{ operationId: string }> | null;
  isTablet: boolean;
  operation?: OperationDocumentation;
}

function Documentation(props: Props) {
  const { operation, isTablet } = props;

  if (!operation) {
    return <Redirect to="/" />;
  }

  const { id, summary, description, method, path, params, body, responses } = operation;

  return (
    <div className={style.details}>
      <OperationPath method={method} path={path} />
      <div className={style.content}>
        {summary && <div className={style.summary}>{summary}</div>}
        {description && <Description className={style.description}>{description}</Description>}
        <hr className={style.separator} />
        <ParamsDoc title="Header Params" params={params.header} />
        <ParamsDoc title="Query Params" params={params.query} />
        <ParamsDoc title="Path Params" params={params.path} />
        {body && (
          <div className={style.requestBodyContainer}>
            <DetailsTitle>Request Body</DetailsTitle>
            <BodyDoc schema={body.schema} example={body.example} />
          </div>
        )}
        <ResponsesDoc key={id} title="Responses" responses={responses} />
      </div>
      {isTablet && (
        <Link to="/" className={style.backButton}>
          <Icon href={arrowIcon} className={style.backButtonIcon} />
          Back
        </Link>
      )}
    </div>
  );
}

export default Documentation;
