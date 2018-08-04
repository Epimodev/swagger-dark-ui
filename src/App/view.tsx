import { createElement, Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
}

class AppView extends Component<Props, State> {
  state = { displayed: false };

  componentDidMount() {
    setTimeout(() => this.setState({ displayed: true }), 0);
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
          {status === 'INIT' && <SelectDoc displayed={displayed} />}
          {status === 'ERROR' && <div>Loading error</div>}
          {status === 'LOADING' && <div>Loading</div>}
          {status === 'LOADED' && (
            <div>
              <Route path="/" component={Menu} />
              <div className={style.detailsContainer}>
                <Route path="/operation/:operationId" component={DocDetails} />
              </div>
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default AppView;
