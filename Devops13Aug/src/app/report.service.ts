import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Report } from "./data/Report";
import { AppType } from "./appType";
import { CodeBase } from "./codeBase";
import { SourceCode } from "./sourceCode";


@Injectable({
  providedIn: "root"
})
export class ReportService {
  CodeBases: string[];
  private static readonly FORM_PAGE_URL = "http://10.236.246.25:8081/report/";
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}
  getReport(language: string): Observable<Report> {
    
    return this.http.get<Report>(ReportService.FORM_PAGE_URL + language);
  }
  getCodeBaseService() {
    return this.http.get("./data/CodeBase.json").subscribe(data => {
      this.CodeBases = data as string[];
      console.log("service"+data);
    });
  }
  getAppType() {
    return [
      new AppType(1, "MicroService"),
      new AppType(2, "UI"),
      new AppType(3, "Legacy")
    ];
  }
  getCodeBases() {
    return [
      new CodeBase(1, 1, "Java", "java"),
      new CodeBase(2, 1, "Kotlin", "kotlin"),
      new CodeBase(3, 2, "Angular", "web"),
      new CodeBase(4, 2, "React", "web"),
      new CodeBase(5, 2, "Polymer", "web"),
      new CodeBase(6, 3, "C#", "c#"),
      new CodeBase(7, 3, "Python", "py")
    ];
  }

  getSourceCode() {
    return [
      new SourceCode(1, "Git"),
      new SourceCode(2, "SVN"),
      new SourceCode(3, "TFS"),
      new SourceCode(4, "CVS")
    ];
  }
}
