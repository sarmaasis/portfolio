declare module '*.json' {
  const value: Record<string, { file: string; css?: string[] }>;
  export default value;
}
