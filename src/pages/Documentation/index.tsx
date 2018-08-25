import { createElement, Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Route } from 'react-router-dom';
import { injectReducer } from 'src/store';
import documentationReducer from 'src/store/reducers/documentation';
import { isTabletDevice } from 'src/utils/ui';
import Menu from './components/Menu';
import Details from './components/Details';
import * as style from './style.scss';

injectReducer('documentation', documentationReducer);

interface Props {
  pathname: string;
}

interface State {
  isTablet: boolean;
}

const MENU_CLASSNAMES = {
  enter: style.menu_enter,
  enterActive: style.menu_enterActive,
  exit: style.menu_exit,
  exitActive: style.menu_exitActive,
};

const DETAILS_CLASSNAMES = {
  enter: style.details_enter,
  enterActive: style.details_enterActive,
  exit: style.details_exit,
  exitActive: style.details_exitActive,
};

class Documentation extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const isTablet = isTabletDevice();
    this.state = { isTablet };

    this.handleWindowResize = this.handleWindowResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  }

  handleWindowResize() {
    this.setState(({ isTablet: wasTablet }) => {
      const isTablet = isTabletDevice();
      if (isTablet !== wasTablet) {
        return { isTablet };
      }
      return null;
    });
  }

  render() {
    const { pathname } = this.props;
    const { isTablet } = this.state;

    return (
      <div>
        <Route path="/" exact={isTablet}>
          {({ match }) => (
            <CSSTransition in={!!match} timeout={1000} classNames={MENU_CLASSNAMES} unmountOnExit>
              <Menu pathname={pathname} isTablet={isTablet} />
            </CSSTransition>
          )}
        </Route>
        <Route path="/operation/:operationId">
          {({ match }) => (
            <CSSTransition
              in={!!match}
              timeout={10000}
              classNames={DETAILS_CLASSNAMES}
              unmountOnExit
            >
              <div className={style.detailsContainer}>
                <Details match={match} isTablet={isTablet} />
              </div>
            </CSSTransition>
          )}
        </Route>
      </div>
    );
  }
}

export default Documentation;
