import * as utils from './utils';

describe('getShallowProperties', () => {
  test('Should return 1 line if schema is `string`', () => {
    const stringSchema: ResponseSchema = { type: 'string' };

    const expected: utils.SchemaLine = {
      label: '-',
      type: 'string',
      typeLabel: 'string',
      indentLevel: 0,
    };

    const stringLines = utils.getShallowProperties(stringSchema);
    expect(stringLines.length).toBe(1);
    expect(stringLines[0]).toEqual(expected);
  });

  test('Should return 1 line if schema is `number`', () => {
    const numberSchema: ResponseSchema = { type: 'number' };

    const expected: utils.SchemaLine = {
      label: '-',
      type: 'number',
      typeLabel: 'number',
      indentLevel: 0,
    };

    const numberLines = utils.getShallowProperties(numberSchema);
    expect(numberLines.length).toBe(1);
    expect(numberLines[0]).toEqual(expected);
  });

  test('Should return 1 line if schema is `integer`', () => {
    const integerSchema: ResponseSchema = { type: 'integer' };

    const expected: utils.SchemaLine = {
      label: '-',
      type: 'integer',
      typeLabel: 'integer',
      indentLevel: 0,
    };

    const integerLines = utils.getShallowProperties(integerSchema);
    expect(integerLines.length).toBe(1);
    expect(integerLines[0]).toEqual(expected);
  });

  test('Should return 1 line if schema is `boolean`', () => {
    const booleanSchema: ResponseSchema = { type: 'boolean' };

    const expected: utils.SchemaLine = {
      label: '-',
      type: 'boolean',
      typeLabel: 'boolean',
      indentLevel: 0,
    };

    const booleanLines = utils.getShallowProperties(booleanSchema);
    expect(booleanLines.length).toBe(1);
    expect(booleanLines[0]).toEqual(expected);
  });

  // tslint:disable-next-line max-line-length
  test('Should return 1 line with indent equals 0 and lines with indent 1 when schema is `object`', () => {
    const schema: ResponseSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        size: { type: 'number' },
        checked: { type: 'boolean' },
      },
    };

    const [objectLine, ...propertiesLines] = utils.getShallowProperties(schema);

    expect(objectLine.indentLevel).toBe(0);
    expect(propertiesLines.length).toBe(3);
    propertiesLines.forEach(line => expect(line.indentLevel).toBe(1));
  });

  test('Object properties lines should have the label from property key', () => {
    const schema: ResponseSchema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        size: { type: 'number' },
        checked: { type: 'boolean' },
      },
    };

    const lines = utils.getShallowProperties(schema);

    expect(lines[1].label).toBe('name');
    expect(lines[2].label).toBe('size');
    expect(lines[3].label).toBe('checked');
  });

  // tslint:disable-next-line max-line-length
  test('Should return 1 line with indent equals 0 and lines with indent 1 when schema is `array` of `object`', () => {
    const schema: ResponseSchema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          size: { type: 'number' },
          checked: { type: 'boolean' },
        },
      },
    };

    const [objectLine, ...propertiesLines] = utils.getShallowProperties(schema);

    expect(objectLine.indentLevel).toBe(0);
    expect(propertiesLines.length).toBe(3);
    propertiesLines.forEach(line => expect(line.indentLevel).toBe(1));
  });

  test('Array properties lines should have the label from property key', () => {
    const schema: ResponseSchema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          size: { type: 'number' },
          checked: { type: 'boolean' },
        },
      },
    };

    const lines = utils.getShallowProperties(schema);

    expect(lines[1].label).toBe('name');
    expect(lines[2].label).toBe('size');
    expect(lines[3].label).toBe('checked');
  });

  test('Should return 1 line when schema is `array` of `string`', () => {
    const schema: ResponseSchema = {
      type: 'array',
      items: { type: 'string' },
    };

    const lines = utils.getShallowProperties(schema);
    expect(lines.length).toBe(1);
  });

  test('Should return 1 line when schema is `array` of `number`', () => {
    const schema: ResponseSchema = {
      type: 'array',
      items: { type: 'number' },
    };

    const lines = utils.getShallowProperties(schema);
    expect(lines.length).toBe(1);
  });

  test('Should return 1 line when schema is `array` of `integer`', () => {
    const schema: ResponseSchema = {
      type: 'array',
      items: { type: 'integer' },
    };

    const lines = utils.getShallowProperties(schema);
    expect(lines.length).toBe(1);
  });

  test('Should return 1 line when schema is `array` of `boolean`', () => {
    const schema: ResponseSchema = {
      type: 'array',
      items: { type: 'boolean' },
    };

    const lines = utils.getShallowProperties(schema);
    expect(lines.length).toBe(1);
  });

  test('Array type label should be `type[]`', () => {
    const objectSchema: ResponseSchema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
    };
    const stringSchema: ResponseSchema = {
      type: 'array',
      items: { type: 'string' },
    };
    const numberSchema: ResponseSchema = {
      type: 'array',
      items: { type: 'number' },
    };
    const integerSchema: ResponseSchema = {
      type: 'array',
      items: { type: 'integer' },
    };
    const booleanSchema: ResponseSchema = {
      type: 'array',
      items: { type: 'boolean' },
    };

    const objectLines = utils.getShallowProperties(objectSchema);
    const stringLines = utils.getShallowProperties(stringSchema);
    const numberLines = utils.getShallowProperties(numberSchema);
    const integerLines = utils.getShallowProperties(integerSchema);
    const booleanLines = utils.getShallowProperties(booleanSchema);

    expect(objectLines[0].typeLabel).toBe('object[]');
    expect(stringLines[0].typeLabel).toBe('string[]');
    expect(numberLines[0].typeLabel).toBe('number[]');
    expect(integerLines[0].typeLabel).toBe('integer[]');
    expect(booleanLines[0].typeLabel).toBe('boolean[]');
  });
});
