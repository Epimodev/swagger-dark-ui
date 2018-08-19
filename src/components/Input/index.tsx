import { createElement, Component, SyntheticEvent } from 'react';
import * as classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Icon from 'src/components/Icon';
import clearIcon from 'src/icons/clear.svg';
import * as style from './style.scss';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string, event?: SyntheticEvent<HTMLInputElement>) => void;
  className?: string;
}

const CLEAR_CLASSNAMES = {
  enter: style.clearButton_enter,
  enterActive: style.clearButton_enterActive,
  exit: style.clearButton_exit,
  exitActive: style.clearButton_exitActive,
};

class Input extends Component<Props> {
  static defaultProps = {
    className: '',
  };

  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.props.onChange(event.currentTarget.value, event);
  }

  clearValue() {
    this.props.onChange('');
  }

  render() {
    const { placeholder, value, className } = this.props;
    const containerClassName = classnames(style.container, className);

    return (
      <div className={containerClassName}>
        <input
          type="text"
          className={style.input}
          placeholder={placeholder}
          value={value}
          onChange={this.handleChange}
        />
        <CSSTransition in={!!value} timeout={300} classNames={CLEAR_CLASSNAMES} unmountOnExit>
          <button className={style.clearButton} onClick={this.clearValue}>
            <Icon href={clearIcon} className={style.clearButtonIcon} />
          </button>
        </CSSTransition>
      </div>
    );
  }
}

export default Input;
