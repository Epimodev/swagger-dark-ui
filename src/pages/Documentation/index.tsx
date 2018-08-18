import { createElement } from 'react';
import { Route } from 'react-router-dom';
import { injectReducer } from 'src/store';
import documentationReducer from 'src/store/reducers/documentation';
import Menu from './components/Menu';
import Details from './components/Details';
import * as style from './style.scss';

injectReducer('documentation', documentationReducer);

export interface Props {
  pathname: string;
}

function Documentation(props: Props) {
  const { pathname } = props;

  return (
    <div>
      <Menu pathname={pathname} />
      <Route
        path="/operation/:operationId"
        render={({ match }) => (
          <div className={style.detailsContainer}>
            <Details match={match} />
          </div>
        )}
      />
    </div>
  );
}

export default Documentation;
