import { createElement, Component } from 'react';
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
        <Route
          path="/"
          exact={isTablet}
          render={() => <Menu pathname={pathname} isTablet={isTablet} />}
        />
        <Route
          path="/operation/:operationId"
          render={({ match }) => (
            <div className={style.detailsContainer}>
              <Details match={match} isTablet={isTablet} />
            </div>
          )}
        />
      </div>
    );
  }
}

export default Documentation;
