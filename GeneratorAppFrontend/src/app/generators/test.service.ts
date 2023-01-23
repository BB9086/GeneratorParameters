import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class TestService{
   
    constructor(private httpClient:HttpClient) {
       
    }
    initialUserDetails:string="testic initial";

  userDetailsSource: BehaviorSubject<string> = new BehaviorSubject<string>(this.initialUserDetails);

    userDetailsObservable: Observable<string > = this.userDetailsSource.asObservable();

    setUserDetails(userDetails: string) {
        console.log('Izvrsavam set funkciju kao glavna instanca');
    this.userDetailsSource.next(userDetails);
    }

    getUserDetails(): Observable<string> {
        console.log('Izvrsavam funkciju kao glavna instanca');
    return this.userDetailsObservable;
    }


    getString():Observable<string>{
        // link: https://stackoverflow.com/questions/49802163/authorization-bearer-token-angular-5
       

          console.log('pokusavam da zovem getgenerators');

        return this.httpClient.get<string>("https://localhost:44350/weatherforecast");

    }



}