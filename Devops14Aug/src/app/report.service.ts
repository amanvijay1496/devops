import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from './data/Report';
import { AppType } from './appType';
import { SourceCode } from './sourceCode';

@Injectable({
  providedIn: 'root'
})
/**
 * Service for providing data to all components from http get requests
 */
export class ReportService {
  private static readonly FORM_PAGE_URL = 'http://10.236.246.25:8081/report/';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private CodeBases: any[] = [];

  constructor(private http: HttpClient) {}
  /**
   * method to get the report for a specific language given in the url
   * @author Team1
   * @param language
   * @returns Report Observable
   */
  getReport(language: string): Observable<Report> {
    return this.http.get<Report>(ReportService.FORM_PAGE_URL + language);
  }
  /**
   * method to get the codebase json file
   * @returns Json Data for CodeBase List
   */
  getCodeBaseService() {
    return this.http.get('../assets/CodeBase.json').subscribe(data => {
      this.CodeBases.push(data);
    });
  }
  /**
   * method to get the application type
   * @returns AppType Array
   */
  getAppType() {
    return [
      new AppType(1, 'MicroService'),
      new AppType(2, 'UI'),
      new AppType(3, 'Legacy')
    ];
  }
  /**
   * method to get the Code Bases for selected Application type
   * @returns CodeBase Array
   */
  getCodeBases() {
    return this.CodeBases[0];
  }
  /**
   * method to get the source code dropdown elements to upload the application
   * @returns SourceCode Array
   */
  getSourceCode() {
    return [
      new SourceCode(1, 'Git'),
      new SourceCode(2, 'SVN'),
      new SourceCode(3, 'TFS'),
      new SourceCode(4, 'CVS')
    ];
  }
}
