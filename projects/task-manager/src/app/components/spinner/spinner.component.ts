import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  showSpinner: boolean;

  constructor(
    private spinnerService: SpinnerService,
    private cdRef: ChangeDetectorRef
  ) {
    this.showSpinner = false;
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }

}
