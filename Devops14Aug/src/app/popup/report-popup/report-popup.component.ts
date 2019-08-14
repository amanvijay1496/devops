import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/api';
import { Report } from 'src/app/Data/Report';


@Component({
  selector: 'app-report-popup',
  templateUrl: './report-popup.component.html',
  styleUrls: ['./report-popup.component.scss']
})
/**
   * @author Team1
   * Popup Component which provides report related to particular language in Dynamic Popup
   */
export class ReportPopupComponent implements OnInit {
  private report:Report; 
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit() {
    this.report = this.config.data.report;
  }

}
