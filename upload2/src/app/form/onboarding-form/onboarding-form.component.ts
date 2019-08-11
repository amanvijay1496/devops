import { Component, OnInit } from "@angular/core";
import { DialogService, MessageService } from "primeng/api";
import { SelectItem } from "primeng/api";
import { DynamicDialogRef } from "primeng/api";
import { DynamicDialogConfig } from "primeng/api";
import { ReportPopupComponent } from "src/app/Popup/report-popup/report-popup.component";
import { OnBoardForm } from "src/app/OnBoardForm";
import { ReportService } from "src/app/report.service";
import { Report } from "src/app/Data/Report";
import { Country } from "src/app/country";
import { State } from "src/app/state";
import { AppType } from "src/app/appType";
import { CodeBase } from 'src/app/codeBase';
interface CodeBase1 {
  name: string;
  code: string;
}
// interface AppType {
//   name: string;
//   code: string;
// }
@Component({
  selector: "app-onboarding-form",
  templateUrl: "./onboarding-form.component.html",
  providers: [DialogService, MessageService],
  styleUrls: ["./onboarding-form.component.scss"]
})
export class OnboardingFormComponent implements OnInit {
  reportData: Report;
  codeBase: SelectItem[];
  selectedCodeBase: CodeBase1;
  selectedCBReport: string;
  // 2nd dropdown
  appType: CodeBase1[];
  selectedAppType: CodeBase1;
  // Different Things
  releaseDate: Date;
  // 3rd Component
  //
  selectedAppType1: AppType = new AppType(0, "Select");
  selectedCodeBase1: CodeBase = new CodeBase(0,1,'Select');
  apptypes: AppType[];
  codebases: CodeBase[];
  //
  errorMsg: string;
  //

  onBoardForm: OnBoardForm = {
    projectName: "",
    projectId: "",
    jobName: null,
    relDate: null,
    appName: "",
    appType: "",
    codeBase: "",
  };
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public reportService: ReportService
  ) {
    //Additional
    this.codeBase = [
      { label: "Select CodeBase", value: null },
      { label: "Java", value: { id: 1, name: "Java", code: "java" } },
      { label: "JavaScript", value: { id: 2, name: "JavaScript", code: "js" } },
      { label: "Web", value: { id: 3, name: "Web", code: "web" } },
      { label: "Typescript", value: { id: 4, name: "TypeScript", code: "ts" } }
    ];
  }

  ngOnInit() {
    // 2nd dropdown
    this.apptypes = this.reportService.getAppType();
    this.onSelect2(this.selectedAppType1.id);

  }
  getDetails(some:string){
console.log("hi"+some);
console.log(this.selectedCodeBase1.name+"pagel");
  }
  onSelect2(appTypeid) {
    this.codebases = this.reportService.getCodeBases().filter(item => item.appTypeid == appTypeid);
  }
  OnSubmit() {}
  showPopUp(mynumber: number) {
    //subscribe function
    console.log("Inside popup"+this.selectedCodeBase1.name);
    this.reportService.getReport("java").subscribe(data => {
      this.reportData = data;
      const ref = this.dialogService.open(ReportPopupComponent, {
        header: "Analysis Report: "+data.date,
        width: "70%",
        contentStyle: { "max-height": "450px", overflow: "auto" },
        transitionOptions: "400ms cubic-bezier(0.25, 0.8, 0.25, 1)",
        data: { report: this.reportData }
      });
    });
    console.log(this.reportData);
    // end of subscribe function
    
  }
}
 