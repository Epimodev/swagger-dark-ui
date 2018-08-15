import { createElement } from 'react';
import { Schema } from 'src/types/documentation';
import { Tabs, Tab } from 'src/components/Tabs';
import BodySchema from '../BodySchema';
import Example from '../Example';

export interface Props {
  schema: Schema;
  example: any[];
}

function BodyDoc(props: Props) {
  const { schema, example } = props;

  return (
    <Tabs>
      <Tab label="Schema">
        <BodySchema schema={schema} />
      </Tab>
      {example && (
        <Tab label="Example">
          <Example>{JSON.stringify(example, null, 2)}</Example>
        </Tab>
      )}
    </Tabs>
  );
}

export default BodyDoc;
