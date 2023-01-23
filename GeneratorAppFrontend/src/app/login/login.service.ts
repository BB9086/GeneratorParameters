import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UserLogin } from "../models/UserLogin.model";
import { catchError, Observable, throwError } from "rxjs";
import { LoginResponse } from "../models/LoginResponse.model";

@Injectable()
export class LoginService {
    // baseHref: string = "https://localhost:44350/api/token";
     //baseHref: string = "http://192.168.0.164/generatorAngularApp/api/token";

     baseHref: string = "https://localhost:44318/api/token";

    //baseHref: string = "http://192.168.0.164/generatorApplication/api/token";


   currentToken:string;
   currentUsername:string;
   currentUsernameFromToken:string;

   notificationMessage:number;

    constructor(private httpClient: HttpClient) {

    }
    userLogin(credentials: UserLogin): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(this.baseHref, credentials, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));

    }

    handleError(errorResponse:HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent){
          console.error('Client side error: ', errorResponse.error.message);
      
        }else{
          console.error('Server side error: ', errorResponse);
        }
        //vraca Observable<never>, tako da i Observable<Employee> kao povratni tip iz getEmployees funkcije moze da ga prihvati
        return throwError(errorResponse);
      
      }
}