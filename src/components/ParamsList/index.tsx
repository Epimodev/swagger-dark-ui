import { createElement, PureComponent } from 'react';
import * as classnames from 'classnames';
import { ParamDocumentation } from 'src/App/types';
import * as style from './style.scss';

interface Props {
  params: ParamDocumentation[];
  className?: string;
}

class ParamsList extends PureComponent<Props> {
  render() {
    const { params, className = '' } = this.props;
    const containerClass = classnames(style.container, className);

    return (
      <div className={containerClass}>
        {params.map(param => (
          <div key={param.name} className={style.row}>
            {param.name}
          </div>
        ))}
      </div>
    );
  }
}

export default ParamsList;
