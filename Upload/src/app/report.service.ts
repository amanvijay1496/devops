import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Report } from "./data/Report";
import { Country } from './country';
import { State } from './state';
import { AppType } from './appType';
import { CodeBase } from './codeBase';

@Injectable({
  providedIn: "root"
})
export class ReportService {
  private static readonly FORM_PAGE_URL = "http://10.236.246.11:8081/report/";
  private headers = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient) {}
  getReport(language: string): Observable<Report> {
    console.log("Inside service");
    return this.http.get<Report>(ReportService.FORM_PAGE_URL + language);
  }
  getAppType() {
    return [
     new AppType(1, 'MicroService' ),
     new AppType(2, 'UI' ),
     new AppType(3, 'DataBase' ),
     new AppType(4, 'Legacy' )
    ];
  }
  getCodeBases() {
    return [
      new CodeBase(1, 1, 'Java' ),
      new CodeBase(2, 1, 'Kotlin' ),
      new CodeBase(3, 2, 'Angular'),
      new CodeBase(4, 2, 'React'),
      new CodeBase(5, 2, 'Polymer' ),
      new CodeBase(6, 3, 'Mysql'),
      new CodeBase(7, 3, 'PostGreSQL' ),
      new CodeBase(8, 3, 'Oracle' ),
      new CodeBase(9, 4, 'Don"t Know'),
      new CodeBase(10, 4, 'Dont"t Know' )
     ];
   }
}
