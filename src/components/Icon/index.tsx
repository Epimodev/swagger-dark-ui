import { createElement } from 'react';

interface Props {
  href: string;
  className?: string;
}

function Icon(props: Props) {
  const { href, className = '' } = props;
  return (
    <svg className={className}>
      <use xlinkHref={href} />
    </svg>
  );
}

export default Icon;
