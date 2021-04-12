import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TasksListComponent } from './../tasks-list/tasks-list.component';
import { UnsubscriberService } from './../../../core/services/unsubscriber.service';
import { TaskGridComponent } from './../task-grid/task-grid.component';
import { DateFormattingService } from './../../../core/services/date-formatting.service';
import { TasksInterface } from './../../../interfaces/tasks.interface';
import { SpinnerService } from './../../../components/spinner/spinner.service';
import { Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { UserService } from './../users.service';
import { Subscription } from 'rxjs';
import { Users } from '../../../interfaces/user.interface';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-manage-tasks',
  templateUrl: './manage-tasks.component.html',
  styleUrls: ['./manage-tasks.component.css']
})
export class ManageTasksComponent implements OnInit, OnDestroy{
  maintainTaskForm: FormGroup;
  private userApiSubscriber: Subscription;
  private createTaskSubscriber: Subscription;
  private getTaskSubscriber: Subscription;

  users: Users[] = [] as Users[];
  selectedTask: TasksInterface = {} as TasksInterface;
  isGridView: boolean;
  modalRef: BsModalRef;

  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
  @ViewChild('taskGrid') taskGrid: TaskGridComponent;
  @ViewChild('taskList') taskList: TasksListComponent;

  constructor(
    private userService: UserService,
    private taskService: TaskManagerService,
    private modalService: BsModalService,
    private dateService: DateFormattingService,
    private unsubscribeService: UnsubscriberService
  ) {
    this.isGridView = true;
  }

  ngOnInit(): void {
    this.getUsersList();
    this.maintainTaskForm = this.setMaintainTaskForm();
    this.getAllTasks();
  }

  /**
   * Calling service to get all tasks
   */
   getAllTasks(): void {

    this.getTaskSubscriber = this.taskService.getAllTasksList().subscribe(
      res => {
        if (res.body && res.body.tasks.length) {
          this.taskGrid.prepareTaskGridData((res.body).tasks);
          this.taskList.prepareList((res.body).tasks);
        }
      }
    );
  }

  /**
   * Toggle View
   * @param isGridView : boolean
   */
  toggleView(isGridView: boolean): void {
    this.isGridView = isGridView;
  }

  /**
   * Preparing user list to show in drop down
   */
  private getUsersList(): void {
    this.userApiSubscriber = this.userService.getUsersList().subscribe(
      res => {
        this.users = (res.body).users || [];
      }
    );
  }

  /**
   * Method to set form group and control for bulk control form
   * @return FormGroup
   */
  setMaintainTaskForm(): FormGroup {
    return new FormGroup({
      message: new FormControl(null, [Validators.required]),
      due_date: new FormControl(null),
      priority: new FormControl(null),
      assigned_to: new FormControl(null)
    });
  }

  /**
   * Select user
   * @param userId: number
   */
  selectUser(userId: number): void {
    this.modalRef.hide();
    this.selectedTask.assigned_to = userId;
  }

  /**
   * Route to proper action based on create and update request
   */
  manageTask(): void {
    if (this.selectedTask  &&
      Object.keys(this.selectedTask).length !== 0 && this.selectedTask.id) {
        this.taskServiceCall(this.getReqForUpdateOrDelete(this.selectedTask), 'update');
      } else {
        this.createTask();
      }
  }

  /**
   * Method to submit task create request
   */
  createTask(): void {
    this.taskServiceCall(this.getRequestObject(), 'create');
  }

  /**
   * Handle delete
   * @param task:TaskInterface
   */
  deleteTask(task: TasksInterface): void {
    this.taskServiceCall(this.getReqForUpdateOrDelete(task), 'delete');
  }

  updateTask(task: TasksInterface): void {

    // Binding Form element
    this.selectedTask = task;
  }

  getReqForUpdateOrDelete(task: TasksInterface): TasksInterface {
    const req = this.getRequestObject();
    req.id = task.id;

    return req;
  }

  /**
   * Calling service to create/update/delete task
   */
  taskServiceCall(req: TasksInterface, reqType: string): void {
    this.createTaskSubscriber = this.taskService.handleTask(req, reqType).subscribe(
      res => {
        this.selectedTask = {} as TasksInterface;
        this.getAllTasks();
      }
    );
  }

  /**
   * To get form field value
   * @param fieldName: string
   * @returns: string
   */
  getFormFieldValue(fieldName: string): string {
    return (this.maintainTaskForm.get(fieldName).value) || null;
  }

  /**
   * Preparing request
   * @returns: TaskInterface
   */
  getRequestObject(): TasksInterface {
    return {
      message: this.getFormFieldValue('message'),
      due_date: this.dateService.getDueDate(this.getFormFieldValue('due_date')),
      priority: this.getFormFieldValue('priority'),
      assigned_to: this.getFormFieldValue('assigned_to')
    };
  }

  /**
   * Showing Modal to display all users
   */
   showUsers(confirmDelModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(confirmDelModal, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-lg'
    }
    );
  }

  /**
   * Hiding date picker on scroll
   */
  @HostListener('window:scroll')
  onScrollEvent(): void {
    this.datepicker.hide();
  }

  /**
   * Destroying all service subscriber call on component destroy
   */
   ngOnDestroy(): void {
    this.unsubscribeService.unsubscribeObservable([
      this.userApiSubscriber,
      this.createTaskSubscriber,
      this.getTaskSubscriber
    ]);
  }
}
