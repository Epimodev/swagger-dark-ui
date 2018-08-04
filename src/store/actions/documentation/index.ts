import { SET_FILTER_VALUE } from './types';

function setFilter(value: string): SET_FILTER_VALUE {
  return {
    type: 'SET_FILTER_VALUE',
    payload: value,
  };
}

export { setFilter };
