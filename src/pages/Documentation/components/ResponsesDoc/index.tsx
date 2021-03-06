import { createElement, Component, Fragment } from 'react';
import { MethodResponse } from 'src/types/documentation';
import BodyDoc from 'src/components/BodyDoc';
import CodeTab from '../CodeTab';
import * as style from './style.scss';

export interface Props {
  title: string;
  responses: MethodResponse[];
}

export interface State {
  selectedCodeIndex: number;
}

class ResponsesDoc extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedCodeIndex: 0,
    };

    this.changeResponse = this.changeResponse.bind(this);
  }

  changeResponse(index: number) {
    this.setState({ selectedCodeIndex: index });
  }

  render() {
    const { title, responses } = this.props;
    const { selectedCodeIndex } = this.state;
    const selectedResponse = responses[selectedCodeIndex];

    return (
      <Fragment>
        <div className={style.title}>{title}</div>
        <div>
          <div className={style.codeList}>
            {responses.map(({ code }, index) => (
              <CodeTab
                key={code}
                code={code}
                index={index}
                selected={index === selectedCodeIndex}
                onClick={this.changeResponse}
              />
            ))}
          </div>
          <div className={style.responseDetails}>
            <BodyDoc schema={selectedResponse.schema} example={selectedResponse.example} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ResponsesDoc;
