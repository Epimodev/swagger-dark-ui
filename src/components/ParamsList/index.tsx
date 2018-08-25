import { createElement, PureComponent } from 'react';
import * as classnames from 'classnames';
import { ParamDocumentation } from 'src/types/documentation';
import TypeLabel from 'src/components/TypeLabel';
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
            <div className={style.mainInfo}>
              <div className={style.cell_name}>{param.name}</div>
              <div className={style.cell_type}>
                <TypeLabel type={param.type}>{param.type}</TypeLabel>
              </div>
            </div>
            {param.required ? (
              <div className={style.cell_required}>Required</div>
            ) : (
              <div className={style.cell_optional}>Optional</div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default ParamsList;
