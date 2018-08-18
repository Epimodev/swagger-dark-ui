import { createElement, PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import Icon from 'src/components/Icon';
import photoLogo from 'src/icons/photo.svg';
import * as style from './style.scss';

const LOADING_TIMEOUT = 1000;

interface Props {
  src: string;
  alt: string;
  className: string;
  imageClassName: string;
}

interface State {
  status: 'INIT' | 'LOADING' | 'LOADED' | 'FAILED';
}

const LOADER_CLASSNAMES = {
  enter: style.placeholder_enter,
  enterActive: style.placeholder_enterActive,
  exit: style.placeholder_exit,
  exitActive: style.placeholder_exitActive,
};

class Image extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      status: 'INIT',
    };

    this.handleLoaded = this.handleLoaded.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(state => {
        if (state.status === 'INIT') {
          return { status: 'LOADING' };
        }
        return null;
      });
    }, LOADING_TIMEOUT);
  }

  handleLoaded() {
    this.setState({ status: 'LOADED' });
  }

  handleError() {
    this.setState({ status: 'FAILED' });
  }

  render() {
    const { src, alt, className, imageClassName } = this.props;
    const { status } = this.state;
    const isLoading = status === 'LOADING';
    const isLoaded = status === 'LOADED';
    const hasFailed = status === 'FAILED';
    const containerClassName = classnames(style.container, className);
    const imgClassName = classnames(style.image, imageClassName, {
      [style.image_loaded]: isLoaded,
    });
    const placeholderClassName = classnames(style.placeholder, {
      [style.placeholder_loading]: isLoading,
    });

    return (
      <div className={containerClassName}>
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          onLoad={this.handleLoaded}
          onError={this.handleError}
        />
        <CSSTransition
          in={isLoading || hasFailed}
          timeout={1000}
          classNames={LOADER_CLASSNAMES}
          unmountOnExit
        >
          <div className={style.placeholderContainer}>
            <Icon href={photoLogo} className={placeholderClassName} />
            <CSSTransition
              in={hasFailed}
              timeout={200}
              classNames={LOADER_CLASSNAMES}
              unmountOnExit
            >
              <div className={style.error}>{alt}</div>
            </CSSTransition>
          </div>
        </CSSTransition>
      </div>
    );
  }
}

export default Image;
