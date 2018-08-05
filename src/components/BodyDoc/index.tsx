import { createElement } from 'react';
import { Tabs, Tab } from 'src/components/Tabs';
import Example from 'src/components/Example';

export interface Props {
  schema: ResponseSchema;
  example: any[];
}

export interface State {
  selectedCodeIndex: number;
}

function BodyDoc(props: Props) {
  const { example } = props;

  return (
    <Tabs>
      <Tab label="Schema">SCHEMA CONTENT</Tab>
      {example && (
        <Tab label="Example">
          <Example>{JSON.stringify(example, null, 2)}</Example>
        </Tab>
      )}
    </Tabs>
  );
}

export default BodyDoc;
