import { SET_FILTER_VALUE } from 'src/App/types';

function setFilter(event: Event): SET_FILTER_VALUE {
  const target = event.currentTarget as HTMLInputElement;
  return {
    type: 'SET_FILTER_VALUE',
    payload: target.value,
  };
}

export { setFilter };
