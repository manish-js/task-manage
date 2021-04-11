import { TasksInterface } from './../../interfaces/tasks.interface';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { TasksApiResponseInterface } from './../../interfaces/tasks-api-response.interface';

const API_BASE = environment.api;

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {

  constructor(private http: HttpClient) { }

  /**
   * Observable call to get all lists
   * @returns Observable<HttpResponse<TasksApiResponseInterface[]>>
   */
  getAllTasksList(): Observable<HttpResponse<TasksApiResponseInterface>> {
    const url = API_BASE + 'list';
    return this.http.get<TasksApiResponseInterface>(url, { observe: 'response' });
  }

  /**
   * Observable call to submit task create request
   * @param req: TasksInterface
   * @returns  Observable<HttpResponse<{ 'taskid': number; 'status': string }>>
   */
   handleTask(req: TasksInterface, requestType): Observable<HttpResponse<
    { 'status': string, 'taskid'?: number; 'message'?: string  }>> {

    const url = API_BASE + requestType;

    const formData = this.getFormDataRequest(req);

    return this.http.post<{ 'status': string, 'taskid'?: number; 'message'?: string }>(
      url, formData, { observe: 'response' });
  }


  /**
   * Preparing Form Data
   * @param param: TaskInterface
   * @return: FormData
   */
  private getFormDataRequest({id, message, due_date, priority, assigned_to}: TasksInterface): FormData {
    const formData = new FormData();

    if (id) {
      formData.append('taskid', id.toString());
    }
    if (message) {
      formData.append('message', message.toString());
    }
    if (due_date && due_date !== '1970-01-01 05:30:00') {
      formData.append('due_date', due_date.toString());
    }
    if (priority) {
      formData.append('priority', priority.toString());
    }
    if (assigned_to) {
      formData.append('assigned_to', assigned_to.toString());
    }
    return formData;
  }

}
