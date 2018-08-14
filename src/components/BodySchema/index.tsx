import { createElement } from 'react';
import TypeLabel from '../TypeLabel';
import { getLineKey, getShallowProperties } from './utils';
import * as style from './style.scss';

export interface Props {
  schema: JsonDefinition;
}

function BodySchema(props: Props) {
  const { schema } = props;
  const schemaLines = getShallowProperties(schema);

  return (
    <div className={style.container}>
      {schemaLines.map((line, index) => {
        const paddingLeft = line.indentLevel * 10;
        return (
          <div key={getLineKey(line, index)} className={style.row}>
            <div className={style.cell_label} style={{ paddingLeft }}>
              {line.label}
            </div>
            <div className={style.cell_type}>
              <TypeLabel type={line.type}>{line.typeLabel}</TypeLabel>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BodySchema;
