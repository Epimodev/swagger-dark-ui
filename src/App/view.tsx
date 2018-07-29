import { h, Component } from 'preact';
import Menu from 'src/components/Menu';
import DocDetails from 'src/pages/DocDetails';
import * as style from './style.scss';

interface Props {
  fetchApiDocumentation: () => void;
  status: 'LOADING' | 'LOADED' | 'ERROR';
}

interface State {}

class AppView extends Component<Props, State> {
  componentDidMount() {
    this.props.fetchApiDocumentation();
  }

  render() {
    const { status } = this.props;

    return (
      <div className={style.container}>
        {status === 'ERROR' && <div>Loading error</div>}
        {status === 'LOADING' && <div>Loading</div>}
        {status === 'LOADED' && (
          <div>
            <Menu />
            <div className={style.detailsContainer}>
              <DocDetails />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AppView;
