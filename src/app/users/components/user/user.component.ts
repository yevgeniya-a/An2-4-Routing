import {Component, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';

import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  @Input() user: UserModel;

  @Output() editUser = new EventEmitter<UserModel>();

  onEditUser() {
    this.editUser.emit(this.user);
  }
}
