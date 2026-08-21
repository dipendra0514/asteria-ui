export type PropDef<T> = {
  name: keyof T & string;
  type: string;
  defaultValue?: string;
  description: string;
};

export function definePropDefs<T>() {
  return <const D extends readonly PropDef<T>[]>(defs: D) => defs;
}
