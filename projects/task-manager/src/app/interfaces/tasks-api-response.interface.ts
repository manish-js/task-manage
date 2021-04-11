import { TasksInterface } from './tasks.interface';

export interface TasksApiResponseInterface {
   'status': string;
   'tasks': TasksInterface[];
}
