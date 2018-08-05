import { createElement, Component, ReactNode } from 'react';
import { connect } from 'react-redux';
import Error from '../Error';
import { resetApp } from 'src/store/actions/selection';
import * as style from './style.scss';

interface DispatchProps {
  resetApp: () => void;
}

interface Props extends DispatchProps {
  children: ReactNode;
}

interface State {
  crashed: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      crashed: false,
    };

    this.resetError = this.resetError.bind(this);
  }

  componentDidCatch(error: any) {
    console.error(error);
    this.props.resetApp();
    this.setState({ crashed: true });
  }

  resetError() {
    this.setState({ crashed: false });
  }

  render() {
    const { children } = this.props;
    const { crashed } = this.state;

    if (crashed) {
      return (
        <div className={style.container}>
          <Error displayed onClose={this.resetError} />
        </div>
      );
    }

    return children;
  }
}

const dispatchToProps: DispatchProps = {
  resetApp,
};

export default connect(null, dispatchToProps)(ErrorBoundary);
