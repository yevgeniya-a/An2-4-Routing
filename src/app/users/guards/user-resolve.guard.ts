import {Injectable} from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot} from '@angular/router';

// rxjs
import {Observable, of} from 'rxjs';
import {map, catchError, take, finalize, delay} from 'rxjs/operators';

import {UserModel} from '../models/user.model';
import {UserArrayService} from '../services';
import {SpinnerService} from '../../widgets';

@Injectable({
  providedIn: 'any'
})
export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private userArrayService: UserArrayService,
    private router: Router,
    private spinner: SpinnerService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel | null> {
    console.log('UserResolve Guard is called');

    this.spinner.show();
    if (!route.paramMap.has('userID')) {
      return of(new UserModel(null, '', ''));
    }

    const id = +route.paramMap.get('userID');

    return this.userArrayService.getUser(id).pipe(
      delay(2000),
      map((user: UserModel) => {
        if (user) {
          return user;
        } else {
          this.router.navigate(['/users']);
          return null;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return of(null);
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
