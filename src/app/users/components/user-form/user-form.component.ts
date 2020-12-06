import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';

import {Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';

import {UserModel} from '../../models/user.model';
import {UserArrayService} from '../../services';
import {CanComponentDeactivate, DialogService} from '../../../core';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, CanComponentDeactivate {
  user: UserModel;
  originalUser: UserModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userArrayService: UserArrayService,
    private dialogService: DialogService
  ) {
  }

  ngOnInit(): void {
    this.route.data.pipe(
      pluck('user')
    ).subscribe((user: UserModel) => {
      this.user = {...user};
      this.originalUser = {...user};
    });
  }

  onSaveUser() {
    const user = {...this.user};

    if (user.id) {
      this.userArrayService.updateUser(user);
      this.router.navigate(['./users', {editedUserID: user.id}]);
    } else {
      this.userArrayService.createUser(user);
      this.onGoBack();
    }
    this.originalUser = {...this.user};
  }

  onGoBack() {
    this.router.navigate(['./../../'], {relativeTo: this.route});
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const same = Object.keys(this.originalUser)
      .every(key => this.originalUser[key] === this.user[key]);

    if (same) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
