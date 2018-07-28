import * as utils from './utils';
import * as giphyExample from '../../assets/swagger-files/giphy.json';

describe('getBaseUrl', () => {
  test('Should return base url with protocol', () => {
    const swaggerSchema = giphyExample as any;

    const expectedValue = 'http://api.giphy.com/v1';

    expect(utils.getBaseUrl(swaggerSchema)).toBe(expectedValue);
  });

  test('Should return base url without protocol', () => {
    const swaggerSchema = {
      ...(giphyExample as any),
      schemes: [],
    };

    const expectedValue = 'api.giphy.com/v1';

    expect(utils.getBaseUrl(swaggerSchema)).toBe(expectedValue);
  });
});
