import { createElement, Component, SyntheticEvent } from 'react';
import * as classnames from 'classnames';
import * as style from './style.scss';

interface Props {
  placeholder: string;
  value: string;
  onChange: (value: string, event: SyntheticEvent<HTMLInputElement>) => void;
  className?: string;
}

class Input extends Component<Props> {
  static defaultProps = {
    className: '',
  };

  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.props.onChange(event.currentTarget.value, event);
  }

  render() {
    const { placeholder, value, className } = this.props;
    const inputClass = classnames(style.input, className);

    return (
      <input
        type="text"
        className={inputClass}
        placeholder={placeholder}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

export default Input;
