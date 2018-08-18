import { createElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';
import Details from './components/Details';
import * as style from './style.scss';

export interface Props {
  pathname: string;
}

function Documentation(props: Props) {
  const { pathname } = props;

  return (
    <div>
      <Menu pathname={pathname} />
      <Route path="/operation/:operationId">
        {({ match }) => (
          <CSSTransition in={!!match} timeout={1000} classNames="" unmountOnExit>
            <div className={style.detailsContainer}>
              <Details match={match} />
            </div>
          </CSSTransition>
        )}
      </Route>
    </div>
  );
}

export default Documentation;
