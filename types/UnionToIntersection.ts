export type UnionToIntersection<Union> = (
  Union extends unknown ? (k: Union) => void : never
) extends (k: infer I) => void
  ? I
  : never;
