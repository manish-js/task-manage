import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertPopupComponent } from './../../components/alert-popup/alert-popup.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  private errors = new BehaviorSubject<string[]>([]);
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  showError(error: string): void {
    const initialState = { error };
    this.bsModalRef = this.modalService.show(AlertPopupComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content = error;
  }
}
