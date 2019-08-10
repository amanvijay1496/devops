import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { ReportPopupComponent } from './Popup/report-popup/report-popup.component';
import { OnboardingFormComponent } from './form/onboarding-form/onboarding-form.component';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
import { DialogService, MessageService } from 'primeng/api';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ReportPopupComponent,
    OnboardingFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    DynamicDialogModule,
    CardModule,
    DropdownModule,
    CalendarModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [DialogService, MessageService],
  entryComponents: [
    OnboardingFormComponent,
    ReportPopupComponent
  ],
  exports: [OnboardingFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
