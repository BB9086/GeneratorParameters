import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { GeneratorInfo } from "../models/GeneratorInfo.model";
import { delay, catchError, map } from "rxjs/operators";
import { LoginService } from "../login/login.service";


@Injectable()
export class GeneratorService {


  initialUserDetails:GeneratorInfo[]=[];

  // baseHref: string = "https://localhost:44350/api/generator";

  //baseHref: string = "http://192.168.0.164/generatorAngularApp/api/generator";
 baseHref: string = "https://localhost:44318/api/generator";

  //baseHref: string = "http://192.168.0.164/generatorApplication/api/generator";



  
  gen: GeneratorInfo = {
    id: 0,
    name: "svasta",
    apparentPower_MVA: 220,
    activePower_MW: 190,
    powerFactor: 0.9,
    currentStorageVol_cubm: '2800',
    producer: "da",
    photoPath: "ne",
    productionYear: "1990",
    location: "minel"

  }

  constructor(private httpClient: HttpClient, private loginService: LoginService) {
    
  }

  //BehaviorSubject:
  private userDetailsSource: BehaviorSubject<GeneratorInfo[]> = new BehaviorSubject<GeneratorInfo[]>(this.initialUserDetails);

  private userDetailsObservable: Observable<GeneratorInfo[]> = this.userDetailsSource.asObservable();

  setCurrentFlowDetails(userDetails: GeneratorInfo[]) {
    this.userDetailsSource.next(userDetails);
  }

  getCurrentFlowDetails(): Observable<GeneratorInfo[]> {
    
     return this.userDetailsObservable;
  }



  getGenerators(auth_token: string): Observable<GeneratorInfo[]> {
    // link: https://stackoverflow.com/questions/49802163/authorization-bearer-token-angular-5
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token

    });
    return this.httpClient.get<GeneratorInfo[]>(this.baseHref, { headers: headers }).pipe(catchError(this.handleError));

  }

  getGeneratorById(id: number, auth_token: string): Observable<GeneratorInfo> {
    // link: https://stackoverflow.com/questions/49802163/authorization-bearer-token-angular-5
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token

    });
    return this.httpClient.get<GeneratorInfo>(this.baseHref + "/" + id, { headers: headers }).pipe(catchError(this.handleError));

  }






  saveGenerator(generator: GeneratorInfo): Observable<GeneratorInfo> {

    // generator.id=0;

    return this.httpClient.post<GeneratorInfo>(this.baseHref, generator, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.currentToken

      })
    }).pipe(catchError(this.handleError));

  }


  updateGenerator(generator: GeneratorInfo): Observable<void> {


    return this.httpClient.put<void>(this.baseHref+ "/" + generator.id, generator, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.loginService.currentToken

      })
    }).pipe(catchError(this.handleError));

  }

  deleteGenerator(id: number, auth_token: string): Observable<void> {
    // link: https://stackoverflow.com/questions/49802163/authorization-bearer-token-angular-5
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth_token

    });
    return this.httpClient.delete<void>(this.baseHref + "/" + id, { headers: headers }).pipe(catchError(this.handleError));

  }

  handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client side error: ', errorResponse.error.message);

    } else {
      console.error('Server side error: ', errorResponse);

    }
    //vraca Observable<never>, tako da i Observable<Employee> kao povratni tip iz getEmployees funkcije moze da ga prihvati
    return throwError(errorResponse);

  }
}