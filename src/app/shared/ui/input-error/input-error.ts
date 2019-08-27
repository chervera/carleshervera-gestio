export interface PropertyError {
  property: string;
  message: string;
  values?: [string, any]
}