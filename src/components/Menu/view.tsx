import { h } from 'preact';
import { MenuRessource } from './types';
// import * as style from './style.scss';

interface Props {
  docName: string;
  docVersion: string;
  ressources: MenuRessource[];
}

function Menu(props: Props) {
  return <div>Menu</div>;
}

export default Menu;
