import { createElement } from 'react';
import Image from 'src/components/Image';
import * as style from './style.scss';

interface Props {
  value: string;
  onClick: (value: string) => void;
  imageClassName: string;
  src: string;
  alt: string;
}

function DocExample(props: Props) {
  const { value, onClick, imageClassName, src, alt } = props;
  const onClickButton = () => onClick(value);

  return (
    <button className={style.container} onClick={onClickButton}>
      <Image src={src} alt={alt} className={style.imageContainer} imageClassName={imageClassName} />
    </button>
  );
}

export default DocExample;
