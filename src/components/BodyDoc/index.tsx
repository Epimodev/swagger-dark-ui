import { createElement } from 'react';
import { Tabs, Tab } from 'src/components/Tabs';
import Schema from '../BodySchema';
import Example from '../Example';

export interface Props {
  schema: JsonDefinition;
  example: any[];
}

function BodyDoc(props: Props) {
  const { schema, example } = props;

  return (
    <Tabs>
      <Tab label="Schema">
        <Schema schema={schema} />
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
