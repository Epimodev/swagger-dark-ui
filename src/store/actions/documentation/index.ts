import * as types from './types';

function setFilter(value: string): types.SET_FILTER_VALUE {
  return {
    type: 'SET_FILTER_VALUE',
    payload: value,
  };
}

export { setFilter };
