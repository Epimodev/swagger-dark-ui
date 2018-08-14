interface SchemaLine {
  label: string;
  type: ParamType;
  typeLabel: string;
  indentLevel: number;
}

function getLineKey(line: SchemaLine, index: number): string {
  return `${line.indentLevel}${line.label}${line.type}${index}`;
}

function getArrayLabel(schema: ArrayDefinition): string {
  return schema.items ? `${schema.items.type}[]` : '[]';
}

function formatObjectProperties(properties: { [key: string]: JsonDefinition }): SchemaLine[] {
  return Object.keys(properties).map(propertyName => {
    const propertySchema = properties[propertyName];
    const typeLabel =
      propertySchema.type === 'array' ? getArrayLabel(propertySchema) : propertySchema.type;
    return {
      typeLabel,
      label: propertyName,
      type: propertySchema.type,
      indentLevel: 1,
    };
  });
}

function getShallowProperties(schema: JsonDefinition): SchemaLine[] {
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
