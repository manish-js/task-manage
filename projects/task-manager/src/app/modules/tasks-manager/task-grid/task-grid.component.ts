import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { UnsubscriberService } from './../../../core/services/unsubscriber.service';
import { TaskManagerService } from './../task-manager.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { TasksInterface } from '../../../interfaces/tasks.interface';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task-grid',
  templateUrl: './task-grid.component.html',
  styleUrls: ['./task-grid.component.css']
})
export class TaskGridComponent implements OnInit {

  modalRef: BsModalRef;
  selectedTask: TasksInterface = {} as TasksInterface;
  warningMsg: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output() deleteTask = new EventEmitter<any>();
  @Output() updateTask = new EventEmitter<any>();

  tasksListGridColumns = [
    'id',
    'message',
    'assigned_to',
    'assigned_name',
    'created_on',
    'due_date',
    'priority',
    'actions'
  ];

  dataSource: MatTableDataSource<TasksInterface>;
  gridData: TasksInterface[] = [] as TasksInterface[];

  constructor(
    private taskService: TaskManagerService,
    private unsubscribeService: UnsubscriberService,
    private modalService: BsModalService,
  ) {
    this.warningMsg = 'Are you sure?';
  }

  ngOnInit(): void {
    this.initialiseDataSource();
  }

  /**
   * Method to initialise Data Source
   */
  initialiseDataSource(): void {
    this.dataSource = new MatTableDataSource<TasksInterface>(this.gridData);
  }

  // Resetting selected task which was sleected for update or delete action
  resetSelectedTask(): void {
    this.selectedTask = {} as TasksInterface;
  }

  /**
   * Preparing data
   * This method will take care if any additinal sanitisation required on data
   * @param tasks: TasksInterface[]
   */
  prepareTaskGridData(tasks: TasksInterface[]): void {
    this.gridData = tasks;

    this.setTasksGridDataSource();
  }

  /**
   * Method to prepare grid data
   */
  setTasksGridDataSource(): void {
    this.dataSource.data = this.gridData;
    this.setPaginator();
  }

  // paginator after grid data load
  setPaginator(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  /**
   * Method to deselect
   *  Bussiness Unit
   */
  confirmBeforeDelete(confirmDelModal: TemplateRef<any>, row: TasksInterface): void {
    this.selectedTask = row;
    this.modalRef = this.modalService.show(confirmDelModal, {
      backdrop: 'static',
      keyboard: false,
      class: 'modal-sm'
    }
    );
  }

  /**
   * deleting task
   */
  deleteSelectedTask(): void {
    this.modalRef.hide();
    this.deleteTask.emit(this.selectedTask);
  }

  /**
   * Emitting update event on parent component
   * @param row: TaskInterface
   */
  emitUpdate(row: TasksInterface): void {
    this.selectedTask = row;
    this.updateTask.emit(this.selectedTask);
  }
}
