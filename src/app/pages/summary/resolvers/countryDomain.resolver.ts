import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of as observableOf } from 'rxjs/observable/of';

import { SummaryService } from '../../../@core/utils/summary.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class CountryDomainsResolver implements Resolve <Observable<any>> {

  constructor(private ds: SummaryService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');
    const system = route.paramMap.get('system');

    return this.ds.getDomainAnalysisCountry(id, system).pipe(
       catchError((err: HttpErrorResponse) => {
        if (err.status === 401)
          this.router.navigate(['/auth/login']);
        console.error(err);
        return observableOf([]);
      }));
  }
}
