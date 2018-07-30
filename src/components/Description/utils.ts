function removeScriptTags(description: string): string {
  return description.replace(/<script>/g, '').replace(/<\/script>/g, '');
}

export { removeScriptTags };
