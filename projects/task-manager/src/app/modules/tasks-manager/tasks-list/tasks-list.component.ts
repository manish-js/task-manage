import { TasksApiResponseInterface } from './../../../interfaces/tasks-api-response.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TasksInterface } from './../../../interfaces/tasks.interface';
import { UnsubscriberService } from './../../../core/services/unsubscriber.service';
import { Component, OnInit, OnDestroy, TemplateRef, EventEmitter, Output } from '@angular/core';
import { TaskManagerService } from '../task-manager.service';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasksList: TasksInterface[];
  selectedTask: TasksInterface = {} as TasksInterface;
  modalRef: BsModalRef;
  warningMsg: string;

  search = new FormControl('');
  $search = this.search.valueChanges.pipe(
    startWith(this.search.value as string),
    debounceTime(100),
    switchMap((res: string) => {
      if (res === '' || !res) {
        return of(this.tasksList);
      }
      res = res.toLowerCase();
      return of(
        this.tasksList.filter(task => task.message.toLowerCase().indexOf(res) >= 0)
      );
    })
  );

  @Output() deleteTask = new EventEmitter<any>();
  @Output() updateTask = new EventEmitter<any>();

  constructor(
    private unsubscribeService: UnsubscriberService,
    private taskService: TaskManagerService,
    private modalService: BsModalService
  ) {
    this.warningMsg = 'Are you sure?';
  }

  ngOnInit(): void { }

  /**
   * Prepare List
   * @param res: TasksApiResponseInterface
   */
  prepareList(res: TasksInterface[]): void {
    this.tasksList = res;
    this.search.setValue('');
    this.search.updateValueAndValidity();
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
    * Emitting update event on parent component
    * @param row: TaskInterface
    */
    updateSelectedTask(row: TasksInterface): void {
      this.selectedTask = row;
      this.updateTask.emit(this.selectedTask);
    }

  /**
   * deleting task
   */
   deleteSelectedTask(): void {
    this.modalRef.hide();
    this.deleteTask.emit(this.selectedTask);
  }

  /**
   * Handling drop
   * @param event: CdkDragDrop<TasksInterface[]>
   */
  drop(event: CdkDragDrop<TasksInterface[]>): void {
    const tempDataSource = this.tasksList;
    const prevIndex = this.tasksList.findIndex((d) => d === event.item.data);
    moveItemInArray(tempDataSource, prevIndex, event.currentIndex);
    this.tasksList = tempDataSource;
  }

}
