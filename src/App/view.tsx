import { createElement, Component, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as classnames from 'classnames';
import Menu from 'src/components/Menu';
import DocDetails from 'src/pages/DocDetails';
import SelectDoc from 'src/pages/SelectDoc';
import * as style from './style.scss';

interface Props {
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
}

interface State {
  displayed: boolean;
  displayTest: boolean;
}

const SELECTION_CLASSNAMES = {
  enter: style.selection_enter,
  enterActive: style.selection_enterActive,
  exit: style.selection_exit,
  exitActive: style.selection_exitActive,
};
const MENU_CLASSNAMES = {
  enter: style.menu_enter,
  enterActive: style.menu_enterActive,
  exit: style.menu_exit,
  exitActive: style.menu_exitActive,
};

class AppView extends Component<Props, State> {
  state = { displayed: false, displayTest: false };

  componentDidMount() {
    setTimeout(() => this.setState({ displayed: true }), 0);

    setTimeout(() => this.setState({ displayTest: true }), 1500);
  }

  render() {
    const { status } = this.props;
    const { displayed } = this.state;
    const backgroundClassName = classnames(style.background, {
      [style.background_enabled]: displayed,
    });

    return (
      <Router>
        <div className={style.container}>
          <div className={backgroundClassName} />
          {status === 'ERROR' && <div>Loading error</div>}
          <Route path="/">
            {({ match, location }) => (
              <Fragment>
                {!match.isExact && status === 'INIT' && <Redirect to="/" />}
                <CSSTransition
                  in={displayed && status !== 'LOADED'}
                  timeout={1000}
                  classNames={SELECTION_CLASSNAMES}
                  unmountOnExit
                >
                  <SelectDoc />
                </CSSTransition>
                <CSSTransition
                  in={status === 'LOADED'}
                  timeout={1000}
                  classNames={MENU_CLASSNAMES}
                  unmountOnExit
                >
                  <Menu pathname={location.pathname} />
                </CSSTransition>
              </Fragment>
            )}
          </Route>

          <Route path="/operation/:operationId">
            {({ match }) => (
              <CSSTransition
                in={!!match && status === 'LOADED'}
                timeout={1000}
                classNames={SELECTION_CLASSNAMES}
                unmountOnExit
              >
                <div className={style.detailsContainer}>
                  <DocDetails match={match} />
                </div>
              </CSSTransition>
            )}
          </Route>
        </div>
      </Router>
    );
  }
}

export default AppView;
