import { createElement, Component } from 'react';
import { Redirect } from 'react-router-dom';
import Input from 'src/components/Input';
import { OperationDocumentation } from 'src/types/documentation';
import { MenuState } from './types';
import { updateFilter, getDisplayedRessources } from './utils';
import Ressource from './components/Ressource';
import * as style from './style.scss';

export interface Props {
  docName: string;
  docVersion: string;
  operations: OperationDocumentation[];
  pathname: string;
  isTablet: boolean;
}

class Menu extends Component<Props, MenuState> {
  constructor(props: Props) {
    super(props);

    this.state = { filter: '' };

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(filter: string) {
    this.setState(updateFilter(filter));
  }

  render() {
    const { docName, docVersion, operations, pathname, isTablet } = this.props;
    const { filter } = this.state;
    const ressources = getDisplayedRessources(filter, operations);

    return (
      <div className={style.container}>
        {pathname === '/' &&
          !isTablet && <Redirect to={`/operation/${ressources[0].operations[0].id}`} />}
        <div>
          <span className={style.docName}>{docName}</span>
          <span className={style.docVersion}>v{docVersion}</span>
        </div>
        <Input
          className={style.input}
          value={filter}
          onChange={this.handleFilterChange}
          placeholder="Filter endpoints"
        />
        {ressources.map(ressource => (
          <Ressource key={ressource.name} {...ressource} isTablet={isTablet} />
        ))}
      </div>
    );
  }
}

export default Menu;
