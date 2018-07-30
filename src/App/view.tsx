import { createElement, Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from 'src/components/Menu';
import DocDetails from 'src/pages/DocDetails';
import * as style from './style.scss';

interface Props {
  fetchApiDocumentation: () => void;
  status: 'INIT' | 'LOADING' | 'LOADED' | 'ERROR';
}

interface State {}

class AppView extends Component<Props, State> {
  componentDidMount() {
    this.props.fetchApiDocumentation();
  }

  render() {
    const { status } = this.props;

    return (
      <Router>
        <div className={style.container}>
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
