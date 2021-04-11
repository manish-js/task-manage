import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule } from './../shared/form.module';
import { TasksManagerRouting } from './tasks-manager-routing.module';

import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskGridComponent } from './task-grid/task-grid.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';

import { httpInterceptorProvider } from './../../core/interceptors/index';

// service
import { UserService } from './users.service';
import { TaskManagerService } from './task-manager.service';
import { HttpErrorService } from './../../core/services/http-error.service';
import { UnsubscriberService } from './../../core/services/unsubscriber.service';
import { DateFormattingService } from './../../core/services/date-formatting.service';

@NgModule({
  declarations: [ManageTasksComponent, UsersComponent, TaskGridComponent, TasksListComponent],
  imports: [
    CommonModule, TasksManagerRouting, FormModule, HttpClientModule, SharedModule
  ],
  providers: [httpInterceptorProvider, TaskManagerService, UserService,
   HttpErrorService, DateFormattingService, UnsubscriberService]
})
export class TasksManagerModule { }
