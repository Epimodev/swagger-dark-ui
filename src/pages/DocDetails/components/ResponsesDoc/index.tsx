import { createElement, Component, Fragment } from 'react';
import { MethodResponse } from 'src/types/documentation';
import ResponseTab from '../ResponseTab';
import * as style from './style.scss';

export interface Props {
  title: string;
  responses: MethodResponse[];
}

export interface State {
  selectedIndex: number;
  selectedTab: 'SCHEMA' | 'EXAMPLE';
}

class ResponsesDoc extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      selectedTab: 'SCHEMA',
    };

    this.changeResponse = this.changeResponse.bind(this);
  }

  changeResponse(index: number) {
    this.setState({ selectedIndex: index });
  }

  render() {
    const { title, responses } = this.props;
    const { selectedIndex } = this.state;
    // const selectedResponse = responses[selectedIndex];

    return (
      <Fragment>
        <div className={style.title}>{title}</div>
        <div className={style.container}>
          <div className={style.codeList}>
            {responses.map(({ code }, index) => (
              <ResponseTab
                key={code}
                code={code}
                index={index}
                selected={index === selectedIndex}
                onClick={this.changeResponse}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ResponsesDoc;
