import { createElement, Component, PureComponent, ReactNode, ReactElement } from 'react';
import * as classnames from 'classnames';
import * as style from './style.scss';

interface TabProps {
  label: string;
  children: ReactNode;
}

class Tab extends Component<TabProps> {
  render() {
    return this.props.children;
  }
}

interface TabsProps {
  children: ReactElement<TabProps>[];
}

interface TabsState {
  selectedIndex: number;
}

class Tabs extends PureComponent<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);

    this.state = { selectedIndex: 0 };
  }

  changeTab(index: number) {
    this.setState({ selectedIndex: index });
  }

  render() {
    const { children } = this.props;
    const { selectedIndex } = this.state;

    return (
      <div>
        <div className={style.tabs}>
          {children.map((tab, index) => {
            const { label } = tab.props;
            const buttonClassName = classnames(style.tab, {
              [style.tab_selected]: selectedIndex === index,
            });
            const handleClick = () => this.changeTab(index);
            return (
              <button key={label} className={buttonClassName} onClick={handleClick}>
                {label}
              </button>
            );
          })}
        </div>
        <div>{children[selectedIndex]}</div>
      </div>
    );
  }
}

export { Tabs, Tab };
