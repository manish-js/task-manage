export interface TasksInterface {
    'message': string;
    'id'?: number;
    'assigned_to'?: number | string;
    'assigned_name'?: string;
    'created_on'?: string; // format '2021-04-09 06:58:24';
    'due_date'?: string; // format'2021-04-11 12:12:12';
    'priority'?: number | string;
}
