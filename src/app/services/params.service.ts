import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ParamsService {
  transformToQuery(FiltersList: any) {
    let filters: any = {};

    for (let filter of FiltersList) {
      if (filter.value.length > 0) {
        filters[filter.name] = filter.value.join();
      }
    }
    return filters;
  }
}