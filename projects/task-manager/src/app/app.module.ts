import { SpinnerService } from './components/spinner/spinner.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AlertPopupComponent } from './components/alert-popup/alert-popup.component';

@NgModule({
  declarations: [AppComponent, BrandComponent, SpinnerComponent, AlertPopupComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ModalModule.forRoot()],
  providers: [SpinnerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
