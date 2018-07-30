import { createElement, PureComponent } from 'react';
import classnames from 'classnames';
import { removeScriptTags } from './utils';
import * as style from './style.scss';

interface Props {
  children: string;
  className?: string;
}

class Description extends PureComponent<Props> {
  render() {
    const { children, className } = this.props;
    const containerClass = classnames(style.container, className);
    // remove <script> tags to avoid code injection
    const fixedChildren = removeScriptTags(children);

    return <div className={containerClass} dangerouslySetInnerHTML={{ __html: fixedChildren }} />;
  }
}

export default Description;
