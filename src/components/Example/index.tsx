import { createElement, PureComponent } from 'react';
import { highlightCode } from './utils';
import * as style from './style.scss';

interface Props {
  children: string;
}

interface State {}

class Example extends PureComponent<Props, State> {
  render() {
    const { children } = this.props;
    const html = highlightCode(children, 'json');

    return <pre className={style.example} dangerouslySetInnerHTML={{ __html: html }} />;
  }
}

export default Example;
