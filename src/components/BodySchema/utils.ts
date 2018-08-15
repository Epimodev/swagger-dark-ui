import { Schema, ArraySchema } from 'src/types/documentation';

interface SchemaLine {
  label: string;
  type: ParamType;
  typeLabel: string;
  indentLevel: number;
}

function getLineKey(line: SchemaLine, index: number): string {
  return `${line.indentLevel}${line.label}${line.type}${index}`;
}

function getArrayLabel(schema: ArraySchema): string {
  return schema.items ? `${schema.items.type}[]` : '[]';
}

function formatObjectProperties(properties: { name: string; schema: Schema }[]): SchemaLine[] {
  return properties.map(({ name, schema }) => {
    const typeLabel = schema.type === 'array' ? getArrayLabel(schema) : schema.type;
    return {
      typeLabel,
      label: name,
      type: schema.type,
      indentLevel: 1,
    };
  });
}

function getShallowProperties(schema: Schema): SchemaLine[] {
  switch (schema.type) {
    case 'string':
    case 'number':
    case 'integer':
    case 'boolean':
      return [
        {
          label: '-',
          typeLabel: schema.type,
          type: schema.type,
          indentLevel: 0,
        },
      ];
    case 'array': {
      const typeLabel = getArrayLabel(schema);
      const arrayLine = {
        typeLabel,
        label: schema.type,
        type: schema.type,
        indentLevel: 0,
      };
      const propertiesLines =
        schema.items && schema.items.type === 'object' && schema.items.properties
          ? formatObjectProperties(schema.items.properties)
          : [];

      return [arrayLine, ...propertiesLines];
    }
    case 'object': {
      const objectLine = {
        label: schema.type,
        typeLabel: schema.type,
        type: schema.type,
        indentLevel: 0,
      };
      const propertiesLines = schema.properties ? formatObjectProperties(schema.properties) : [];
      return [objectLine, ...propertiesLines];
    }
  }

  return [];
}

export { SchemaLine, getLineKey, getShallowProperties };
