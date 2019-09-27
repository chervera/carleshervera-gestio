import { HttpParams } from '@angular/common/http';

export abstract class Api {
  readonly URL_V1 = 'v1/';
  readonly URL_BASE_API = 'api/';
  readonly URL_API = this.URL_BASE_API + this.URL_V1;

  readonly HEADER_TOTAL_ITEMS = 'X-Total-Count';

  public appendSearchQueryParams(
    queryParams: HttpParams,
    searchProject: Object
  ) {
    for (var [key, value] of Object.entries(searchProject)) {
      if (value) {
        queryParams = queryParams.append(key, value);
      }
    }
    return queryParams;
  }
}
