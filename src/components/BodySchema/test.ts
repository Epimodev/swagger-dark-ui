import { Schema } from 'src/types/documentation';
import * as utils from './utils';

describe('getShallowProperties', () => {
  test('Should return 1 line if schema is `string`', () => {
    const stringSchema: Schema = { type: 'string', description: '' };

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
    const numberSchema: Schema = { type: 'number', description: '' };

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
    const integerSchema: Schema = { type: 'integer', description: '' };

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
    const booleanSchema: Schema = { type: 'boolean', description: '' };

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
    const schema: Schema = {
      type: 'object',
      description: '',
      properties: [
        { name: 'name', schema: { type: 'string', description: '' } },
        { name: 'size', schema: { type: 'number', description: '' } },
        { name: 'checked', schema: { type: 'boolean', description: '' } },
      ],
    };

    const [objectLine, ...propertiesLines] = utils.getShallowProperties(schema);

    expect(objectLine.indentLevel).toBe(0);
    expect(propertiesLines.length).toBe(3);
    propertiesLines.forEach(line => expect(line.indentLevel).toBe(1));
  });

  test('Object properties lines should have the label from property name', () => {
    const schema: Schema = {
      type: 'object',
      description: '',
      properties: [
        { name: 'name', schema: { type: 'string', description: '' } },
        { name: 'size', schema: { type: 'number', description: '' } },
        { name: 'checked', schema: { type: 'boolean', description: '' } },
      ],
    };

    const lines = utils.getShallowProperties(schema);

    expect(lines[1].label).toBe('name');
    expect(lines[2].label).toBe('size');
    expect(lines[3].label).toBe('checked');
  });

  // tslint:disable-next-line max-line-length
  test('Should return 1 line with indent equals 0 and lines with indent 1 when schema is `array` of `object`', () => {
    const schema: Schema = {
      type: 'array',
      description: '',
      items: {
        type: 'object',
        description: '',
        properties: [
          { name: 'name', schema: { type: 'string', description: '' } },
          { name: 'size', schema: { type: 'number', description: '' } },
          { name: 'checked', schema: { type: 'boolean', description: '' } },
        ],
      },
    };

    const [objectLine, ...propertiesLines] = utils.getShallowProperties(schema);

    expect(objectLine.indentLevel).toBe(0);
    expect(propertiesLines.length).toBe(3);
    propertiesLines.forEach(line => expect(line.indentLevel).toBe(1));
  });

  test('Array properties lines should have the label from property name', () => {
    const schema: Schema = {
      type: 'array',
      description: '',
      items: {
        type: 'object',
        description: '',
        properties: [
          { name: 'name', schema: { type: 'string', description: '' } },
          { name: 'size', schema: { type: 'number', description: '' } },
          { name: 'checked', schema: { type: 'boolean', description: '' } },
        ],
      },
    };

    const lines = utils.getShallowProperties(schema);

    expect(lines[1].label).toBe('name');
    expect(lines[2].label).toBe('size');
    expect(lines[3].label).toBe('checked');
  });

  test('Should return 1 line when schema is `array` of `string`', () => {
    const schema: Schema = {
      type: 'array',
      description: '',
      items: { type: 'string', description: '' },
    };

    const lines = utils.getShallowProperties(schema);
    expect(lines.length).toBe(1);
  });

  test('Should return 1 line when schema is `array` of `number`', () => {
    const schema: Schema = {
      type: 'array',
      description: '',
      items: { type: 'number', description: '' },
    };

    const lines = utils.getShallowProperties(schema);
    expect(lines.length).toBe(1);
  });

  test('Should return 1 line when schema is `array` of `integer`', () => {
    const schema: Schema = {
      type: 'array',
      description: '',
      items: { type: 'integer', description: '' },
    };

    const lines = utils.getShallowProperties(schema);
    expect(lines.length).toBe(1);
  });

  test('Should return 1 line when schema is `array` of `boolean`', () => {
    const schema: Schema = {
      type: 'array',
      description: '',
      items: { type: 'boolean', description: '' },
    };

    const lines = utils.getShallowProperties(schema);
    expect(lines.length).toBe(1);
  });

  test('Array type label should be `type[]`', () => {
    const objectSchema: Schema = {
      type: 'array',
      description: '',
      items: {
        type: 'object',
        description: '',
        properties: [{ name: 'name', schema: { type: 'string', description: '' } }],
      },
    };
    const stringSchema: Schema = {
      type: 'array',
      description: '',
      items: { type: 'string', description: '' },
    };
    const numberSchema: Schema = {
      type: 'array',
      description: '',
      items: { type: 'number', description: '' },
    };
    const integerSchema: Schema = {
      type: 'array',
      description: '',
      items: { type: 'integer', description: '' },
    };
    const booleanSchema: Schema = {
      type: 'array',
      description: '',
      items: { type: 'boolean', description: '' },
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
