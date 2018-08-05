interface SchemaLine {
  type: ParamType;
  label: string;
  indentLevel: number;
}

function getShallowProperties(schema: ResponseSchema): SchemaLine[] {
  return [];
}

export { SchemaLine, getShallowProperties };
