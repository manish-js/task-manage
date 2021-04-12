import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, BsDatepickerModule.forRoot(), MatSelectModule,
    MatTableModule, MatPaginatorModule, MatIconModule, MatListModule, DragDropModule, MatCardModule
  ],
  exports: [
    CommonModule, BsDatepickerModule, MatSelectModule,
    MatTableModule, MatPaginatorModule, MatIconModule, MatListModule, DragDropModule, MatCardModule
  ]
})
export class SharedModule { }
