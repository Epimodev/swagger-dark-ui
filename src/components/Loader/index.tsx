import { createElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import * as style from './style.scss';

interface Props {
  displayed: boolean;
}

const ANIMATION_CLASSNAMES = {
  enter: style.enter,
  enterActive: style.enterActive,
  exit: style.exit,
  exitActive: style.exitActive,
};

function Loader(props: Props) {
  const { displayed } = props;

  return (
    <CSSTransition in={displayed} timeout={500} classNames={ANIMATION_CLASSNAMES} unmountOnExit>
      <div className={style.container}>
        <div className={style.loaderContainer}>
          <div className={style.loader} />
        </div>
      </div>
    </CSSTransition>
  );
}

export default Loader;
