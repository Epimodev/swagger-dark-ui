import { createElement, Component, Fragment, ComponentType } from 'react';
import { CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import * as classnames from 'classnames';
import SelectDoc from 'src/pages/SelectDoc';
import * as style from './style.scss';

interface Props {
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
}

interface State {
  displayed: boolean;
  documentation: ComponentType<any> | null;
}

const SELECTION_CLASSNAMES = {
  enter: style.selection_enter,
  enterActive: style.selection_enterActive,
  exit: style.selection_exit,
  exitActive: style.selection_exitActive,
};
const DOCUMENTATION_CLASSNAMES = {
  enter: style.documentation_enter,
  enterActive: style.documentation_enterActive,
  exit: style.documentation_exit,
  exitActive: style.documentation_exitActive,
};

class AppView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { displayed: false, documentation: null };
  }

  async componentDidMount() {
    setTimeout(() => this.setState({ displayed: true }), 0);

    const documentationModule = await import('src/pages/Documentation');
    this.setState({ documentation: documentationModule.default });
  }

  render() {
    const { status } = this.props;
    const { displayed, documentation: Documentation } = this.state;
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
                {Documentation && (
                  <CSSTransition
                    in={status === 'LOADED'}
                    timeout={1000}
                    classNames={DOCUMENTATION_CLASSNAMES}
                    unmountOnExit
                  >
                    <Documentation pathname={location.pathname} match={match} />
                  </CSSTransition>
                )}
              </Fragment>
            )}
          </Route>
        </div>
      </Router>
    );
  }
}

export default AppView;
