import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { Report } from 'src/app/Data/Report';


@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrls: ['./report-popup.component.scss']
})
export class ReportPopupComponent implements OnInit {
  report:Report; 
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.report = this.config.data.report;
    console.log(this.report);
  }

}
