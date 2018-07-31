import { createElement, Component } from 'react';
import * as classnames from 'classnames';
import MethodLabel from 'src/components/MethodLabel';
import * as style from './style.scss';

interface Props {
  method: HttpMethod;
  path: string;
}

interface State {
  atTopWithScroll: boolean;
}

class OperationPath extends Component<Props, State> {
  container: HTMLDivElement | null = null;
  parent: HTMLDivElement | null = null;

  constructor(props: Props) {
    super(props);

    this.state = {
      atTopWithScroll: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
    this.setContainer = this.setContainer.bind(this);
  }

  componentDidMount() {
    if (this.parent) {
      this.parent.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (this.parent) {
      this.parent.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll() {
    if (this.container && this.parent) {
      const topPosition = this.container.offsetTop - this.parent.scrollTop;
      const atTopWithScroll = topPosition <= 15;
      const currentValue = this.state.atTopWithScroll;
      if (atTopWithScroll !== currentValue) {
        this.setState({ atTopWithScroll });
      }
    }
  }

  setContainer(ref: HTMLDivElement | null) {
    this.container = ref;
    this.parent = ref && ref.offsetParent ? (ref.offsetParent as HTMLDivElement) : null;
  }

  render() {
    const { method, path } = this.props;
    const { atTopWithScroll } = this.state;
    const containerClass = classnames(style.container, {
      [style.container_withBackground]: atTopWithScroll,
    });

    return (
      <div ref={this.setContainer} className={containerClass}>
        <MethodLabel method={method} className={style.method} />
        <span className={style.path}>{path}</span>
      </div>
    );
  }
}

export default OperationPath;
