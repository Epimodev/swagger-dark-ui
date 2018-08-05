import { createElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import Icon from '../Icon';
import Button from '../Button';
import cancelIcon from 'src/icons/cancel.svg';
import * as style from './style.scss';

interface Props {
  displayed: boolean;
  onClose: () => void;
}

const ANIMATION_CLASSNAMES = {
  enter: style.enter,
  enterActive: style.enterActive,
  exit: style.exit,
  exitActive: style.exitActive,
};

function Loader(props: Props) {
  const { displayed, onClose } = props;

  return (
    <CSSTransition in={displayed} timeout={500} classNames={ANIMATION_CLASSNAMES} unmountOnExit>
      <div className={style.container}>
        <div className={style.iconContainer}>
          <Icon href={cancelIcon} className={style.icon} />
        </div>
        <h2 className={style.title}>Ouch !</h2>
        <p className={style.sentence}>An error has occured</p>
        <div className={style.buttonContainer}>
          <Button onClick={onClose}>RESTART APPLICATION</Button>
        </div>
      </div>
    </CSSTransition>
  );
}

export default Loader;
