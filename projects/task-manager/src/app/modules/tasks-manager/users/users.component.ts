import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Users } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() users: Users[];
  @Output() selectUser = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emitting select event
   * @param userId: number
   */
  emitSelectUserEvent(userId: number): void {
    this.selectUser.emit(userId);
  }

}
