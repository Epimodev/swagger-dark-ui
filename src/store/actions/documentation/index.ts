import { SyntheticEvent } from 'react';
import { SET_FILTER_VALUE } from './types';

function setFilter(event: SyntheticEvent<HTMLInputElement>): SET_FILTER_VALUE {
  const target = event.currentTarget as HTMLInputElement;
  return {
    type: 'SET_FILTER_VALUE',
    payload: target.value,
  };
}

export { setFilter };
