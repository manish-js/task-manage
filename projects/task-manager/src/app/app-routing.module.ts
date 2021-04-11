import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () => import('./modules/tasks-manager/tasks-manager.module')
      .then(mod => mod.TasksManagerModule)
  },
    // Redirecting Invalid URL Request
    { path: '**', redirectTo: '' }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
