import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TaskFormComponent, TaskListComponent} from './components';

const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    data: {title: 'Task Manager'}
  },
  {
    path: 'edit/:taskID',
    component: TaskFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {
}
