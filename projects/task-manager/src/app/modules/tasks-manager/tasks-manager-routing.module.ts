import { ManageTasksComponent } from './manage-tasks/manage-tasks.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ManageTasksComponent,
        data: {
            pageTitle: 'Devza: Tasks Manager'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TasksManagerRouting { }
