import axios, { AxiosResponse } from 'axios';
import { AppThunk } from 'src/store';
import * as types from './types';

const LOADING_TIMEOUT = 1500;

function fetchApiDocumentation(): AppThunk<void> {
  return (dispatch, getState) => {
    let loaded = false;

    axios
      // .get('/assets/swagger-files/tactill.json')
      .get('/assets/swagger-files/peach.json')
      .then((response: AxiosResponse<SwaggerSchema>) => {
        loaded = true;
        dispatch({
          type: 'FETCH_SWAGGER_SUCCESS',
          payload: response.data,
        } as types.FETCH_SWAGGER_SUCCESS);
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: 'FETCH_SWAGGER_FAIL' });
      });

    setTimeout(() => {
      if (!loaded) {
        // display loader only if http request is too long
        dispatch({ type: 'FETCH_SWAGGER_START' });
      }
    }, LOADING_TIMEOUT);
  };
}

export { fetchApiDocumentation };
