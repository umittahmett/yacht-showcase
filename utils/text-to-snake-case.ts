export function toSnakeCase(text: string): string {
  return text
    .replace(/\s+/g, '_') 
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    .replace(/^_+/, '') 
    .replace(/_+/g, '_');
}