import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {UserModel} from '../../models/user.model';
import {UserArrayService} from '../../services';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<UserModel[]>;

  private editedUser: UserModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userArrayService: UserArrayService
  ) {
  }

  ngOnInit(): void {
    this.users$ = this.userArrayService.users$;

    const observer = {
      next: (user: UserModel) => {
        this.editedUser = {...user};
        console.log(
          `Last time you edited user ${JSON.stringify(this.editedUser)}`
        );
      },
      error: (err: any) => console.log(err)
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => this.userArrayService.getUser(+params.get('editedUserID')))
      )
      .subscribe(observer);

  }

  onEditUser(user: UserModel) {
    // const link = ['/users/edit', user.id];
    // this.router.navigate(link);
    // or
    const link = ['edit', user.id];
    this.router.navigate(link, {relativeTo: this.route});
  }

  isEdited(user: UserModel): boolean {
    if (this.editedUser) {
      return user.id === this.editedUser.id;
    }
    return false;
  }
}
