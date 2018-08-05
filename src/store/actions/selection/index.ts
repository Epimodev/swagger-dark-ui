import axios, { AxiosResponse } from 'axios';
import { AppThunk } from 'src/store';
import * as types from './types';
import { getBaseUrl, getOperations } from './utils';

const LOADING_TIMEOUT = 600;

function updateUrl(value: string): types.UPDATE_DOC_URL {
  return {
    type: 'UPDATE_DOC_URL',
    payload: value,
  };
}

function fetchApiDocumentation(url: string): AppThunk<void> {
  return dispatch => {
    let finished = false;

    axios
      .get(url)
      .then((response: AxiosResponse<SwaggerSchema>) => {
        finished = true;
        dispatch(saveSwaggerDoc(response.data));
      })
      .catch(error => {
        finished = true;
        console.error(error);
        dispatch({ type: 'FETCH_SWAGGER_FAIL' });
      });

    setTimeout(() => {
      if (!finished) {
        // display loader only if http request is too long
        dispatch({ type: 'FETCH_SWAGGER_START' });
      }
    }, LOADING_TIMEOUT);
  };
}

function fetchUserUrl(): AppThunk<void> {
  return (dispatch, getState) => {
    const {
      selection: { url },
    } = getState();

    dispatch(fetchApiDocumentation(url));
  };
}

function fetchApiExemple(exampleName: string): AppThunk<void> {
  return fetchApiDocumentation(`/assets/swagger-files/${exampleName}.json`);
}

function readJsonFile(file: File): AppThunk<void> {
  return dispatch => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;

      try {
        const parsedJson: SwaggerSchema = JSON.parse(text);

        dispatch(saveSwaggerDoc(parsedJson));
      } catch (error) {
        console.error(error);
        dispatch({
          type: 'UPDATE_DROP_ZONE_STATUS',
          payload: 'BAD_FORMAT',
        } as types.UPDATE_DROP_ZONE_STATUS);
      }
    };

    reader.readAsText(file);
  };
}

function saveSwaggerDoc(data: SwaggerSchema): types.FETCH_SWAGGER_SUCCESS {
  return {
    type: 'FETCH_SWAGGER_SUCCESS',
    payload: {
      name: data.info.title,
      version: data.info.version,
      baseUrl: getBaseUrl(data),
      operations: getOperations(data),
    },
  };
}

export { updateUrl, fetchUserUrl, fetchApiExemple, readJsonFile };
