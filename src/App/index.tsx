import { h } from 'preact';
import Hello from 'src/pages/Hello';
import * as style from './style.scss';

interface Props {}

function App(props: Props) {
  return (
    <div className={style.container}>
      <Hello />
    </div>
  );
}

export default App;
