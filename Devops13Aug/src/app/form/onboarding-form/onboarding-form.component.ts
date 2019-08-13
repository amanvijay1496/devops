import { Component, OnInit } from "@angular/core";
import { DialogService, MessageService } from "primeng/api";
import { SelectItem } from "primeng/api";
import { DynamicDialogRef } from "primeng/api";
import { DynamicDialogConfig } from "primeng/api";
import { ReportPopupComponent } from "src/app/Popup/report-popup/report-popup.component";
import { OnBoardForm } from "src/app/OnBoardForm";
import { ReportService } from "src/app/report.service";
import { Report } from "src/app/Data/Report";
import { AppType } from "src/app/appType";
import { CodeBase } from "src/app/codeBase";
import { SourceCode } from "src/app/sourceCode";
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
  // Dynamic Dependent DropDown
  selectedAppType1: AppType = new AppType(0, "Select");
  selectedCodeBase1: CodeBase = new CodeBase(0, 1, "Select", "Select");
  apptypes: AppType[];
  codebases: CodeBase[];
  // End of 1st Dropdown
  // 2nd DropDown
  selectedSourceCode1: SourceCode = new SourceCode(0, "Select");
  sourceCodes: SourceCode[];
  // End of 2nd Dropdown
  errorMsg: string;
  //
  minimumDate: Date;
  //Dropdown value for codebase
  CodeBases: string[];
  //Source Code DropDown Flag Value
  gitFlag: boolean = false;
  svnFlag: boolean = false;
  tfsFlag: boolean = false;
  cvsFlag: boolean = false;

  onBoardForm: OnBoardForm = {
    projectName: "",
    projectId: "",
    jobName: null,
    relDate: null,
    appName: "",
    appType: "",
    codeBase: ""
  };
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public reportService: ReportService
  ) {
    //Date Format
    this.minimumDate = new Date();
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
    // 1st dropdown
    this.apptypes = this.reportService.getAppType();
    this.onSelect2(this.selectedAppType1.id);
    // 2nd Dropdown
    this.sourceCodes = this.reportService.getSourceCode();
  }
  onSelect2(appTypeid) {
    this.codebases = this.reportService
      .getCodeBases()
      .filter(item => item.appTypeid == appTypeid);
  }
  onSelect3(sourceCode) {
    if (sourceCode === "1") {
      this.gitFlag = true;
      this.svnFlag = false;
      this.cvsFlag = false;
      this.tfsFlag = false;
    } else if (sourceCode === "2") {
      this.gitFlag = false;
      this.svnFlag = true;
      this.cvsFlag = false;
      this.tfsFlag = false;
    } else if (sourceCode === "3") {
      this.gitFlag = false;
      this.svnFlag = false;
      this.cvsFlag = false;
      this.tfsFlag = true;
    } else if (sourceCode === "4") {
      this.gitFlag = false;
      this.svnFlag = false;
      this.cvsFlag = true;
      this.tfsFlag = false;
    }
  }
  OnSubmit() {
    this.messageService.add({severity:'success', summary: 'Application Onboarded', detail:'Thank You For Submission.'});
  }
  showPopUp(codeBase: string) {
    // Subscribe function
    this.reportService
      .getReport(this.selectedCodeBase1.langValue)
      .subscribe(data => {
        this.reportData = data;
        const ref = this.dialogService.open(ReportPopupComponent, {
          header: "Analysis Report: " + data.date,
          width: "70%",
          contentStyle: { "max-height": "450px", overflow: "auto" },
          transitionOptions: "400ms cubic-bezier(0.25, 0.8, 0.25, 1)",
          data: { report: this.reportData }
        });
      });
    // End of subscribe function
  }

  //2nd 
  getCodeBaseService() {
    this.reportService.getCodeBaseService();
  }
}
