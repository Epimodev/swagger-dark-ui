import { h, Component } from 'preact';
import Hello from 'src/pages/Hello';
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
        {status === 'LOADED' && <Hello />}
      </div>
    );
  }
}

export default AppView;
