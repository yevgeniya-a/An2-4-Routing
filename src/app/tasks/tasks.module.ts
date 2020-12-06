import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TasksRoutingModule} from './tasks-routing.module';
import {TaskComponent, TaskFormComponent, TaskListComponent} from './components';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule
  ]
})
export class TasksModule {
}
