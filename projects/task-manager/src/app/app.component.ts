import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  toShowTaskPage: boolean;

  constructor(private router: Router) {
    this.toShowTaskPage = false;
   }

  /**
   * Routing to Manage task
   */
  routeToManageTask(): void {
    this.toShowTaskPage = true;
    this.router.navigateByUrl('/tasks');
  }
}
