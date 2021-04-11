import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormattingService {

  constructor() { }

  /**
   *  Converting date format
   * @param dateSelected: string
   * @returns: string: YYYY-MM-DD HH:MM:SS
   */
  getDueDate(dateSelected: string): string {
    const date = new Date(dateSelected);
    const  month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const mins = ('0' + date.getMinutes()).slice(-2);
    const sec = ('0' + date.getSeconds()).slice(-2);
    return [date.getFullYear(), month, day].join('-') + ' ' + [hour, mins, sec].join(':');
  }
}
