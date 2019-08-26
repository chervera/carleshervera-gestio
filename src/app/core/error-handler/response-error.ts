export class ResponseError {
  code?: number;
  message?: string;
  messageDetail?: string;
  propertyErrors?: PropertyError[];

  constructor(error: ResponseError) {
    this.code = error.code;
    this.message = error.message;
    this.messageDetail = error.messageDetail;
    this.propertyErrors = error.propertyErrors;
    this.propertyErrors.forEach(property => {
      this[property.property] = property;
    })
  }
}

export class PropertyError {
  property: string;
  message: string;
  values?: [string, any]
}