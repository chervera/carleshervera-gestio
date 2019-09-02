export abstract class Api {
  readonly URL_V1 = 'v1/';
  readonly URL_BASE_API = 'api/';
  readonly URL_API = this.URL_BASE_API + this.URL_V1;

  readonly HEADER_TOTAL_ITEMS = 'X-Total-Count';

}