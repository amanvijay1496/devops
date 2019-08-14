import { Component, OnInit } from "@angular/core";
import { DialogService, MessageService } from "primeng/api";
import { ReportPopupComponent } from "src/app/Popup/report-popup/report-popup.component";
import { OnBoardForm } from "src/app/OnBoardForm";
import { ReportService } from "src/app/report.service";
import { Report } from "src/app/Data/Report";
import { AppType } from "src/app/appType";
import { CodeBase } from "src/app/codeBase";
import { SourceCode } from "src/app/sourceCode";
@Component({
  selector: "app-onboarding-form",
  templateUrl: "./onboarding-form.component.html",
  providers: [DialogService, MessageService],
  styleUrls: ["./onboarding-form.component.scss"]
})
export class OnboardingFormComponent implements OnInit {
  private reportData: Report;
  // Dynamic Dependent DropDown
  private selectedAppType: AppType = new AppType(0, "Select");
  private selectedCodeBase: CodeBase = new CodeBase(0, 1, "Select", "Select");
  private apptypes: AppType[];
  private codebases: CodeBase[];
  // End of 1st Dropdown
  // 2nd DropDown
  private selectedSourceCode1: SourceCode = new SourceCode(0, "Select");
  private sourceCodes: SourceCode[];
  // End of 2nd Dropdown
  // For Calendar Restriction to show previous dates
  private minimumDate: Date;
  // Dropdown value for codebase
  private CodeBases: string[];
  // Source Code DropDown Flag Value
  private gitFlag = false;
  private svnFlag = false;
  private tfsFlag = false;
  private cvsFlag = false;

  private onBoardForm: OnBoardForm = {
    projectName: '',
    projectId: '',
    jobName: null,
    relDate: null,
    appName: '',
    appType: '',
    codeBase: ''
  };
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public reportService: ReportService
  ) {
    // Date Format
    this.minimumDate = new Date();
  }

  ngOnInit() {
    // external file for list
    this.reportService.getCodeBaseService();
    // 1st dropdown
    this.apptypes = this.reportService.getAppType();
    // 2nd Dropdown
    this.sourceCodes = this.reportService.getSourceCode();
    this.onSelect2(this.selectedAppType.id);
  }
  /**
   * Function to filter the appId to get the particular codebase to show dropdown
   * @author Team1
   * @param appTypeid
   */
  onSelect2(appTypeid) {
    this.codebases = this.reportService
      .getCodeBases()
      // tslint:disable-next-line: triple-equals
      .filter(item => item.appTypeid == appTypeid);
  }
  /**
   * Function to select the source code from the avalilable options based on the flag values
   * @param sourceCode
   */
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
  /**
   *  Function to show successfule message after form submition
   */
  OnSubmit() {
    this.messageService.add({
      severity: "success",
      summary: "Application Onboarded",
      detail: "Thank You For Submission."
    });
  }
  /**
   * Function to display popup which has the report consisting of the issues faced by a particular codebase
   * @param codeBase
   */
  showPopUp(codeBase: string) {
    // Subscribe function
    this.reportService
      .getReport(this.selectedCodeBase.langValue)
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
}
