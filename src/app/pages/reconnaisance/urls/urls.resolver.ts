import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';
import { HttpErrorResponse } from '@angular/common/http';

import { ReconnaissanceService } from '../../../@core/utils/reconnaisance.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'any',
})
export class UrlsResolver implements Resolve <Observable<any>> {

  constructor(private ds: ReconnaissanceService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.parent.paramMap.get('id');
    const system = route.parent.paramMap.get('system');

    return this.ds.getUrls(id, system).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401)
          this.router.navigate(['/auth/login']);
        console.error(err);
        return observableOf([]);
      }));
  }
}
