import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { TestService } from './test.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
  
  
})
export class Test2Component implements OnInit {

  constructor(private testService:TestService, private loginService:LoginService, private jwtHelperService:JwtHelperService, private router:Router) { 

    if(this.jwtHelperService.isTokenExpired(this.loginService.currentToken)){

      localStorage.removeItem("userCredentials");
      this.loginService.currentToken = null;
      this.loginService.currentUsername = null;
      this.loginService.currentUsernameFromToken=null;
      this.router.navigate(['/login']);
    }

  }

  ngOnInit(): void {
    console.log(this.jwtHelperService.getTokenExpirationDate(this.loginService.currentToken));
    this.testService.getUserDetails().subscribe(subscribedData => {
      console.log('Latest Observable Data =>', subscribedData);
    });
  }
  

  testBehaviorSubject() {
    this.testService.setUserDetails('testic 2222');
  }

  testGoToList(){
    this.router.navigate(['/list'],{
      queryParams:{'accessToken':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiJhMWJlYzdkZC1hNjU4LTQyYWQtOGEwYy03ZWI0NTQyMGYwMGEiLCJpYXQiOiIxMi83LzIwMjIgMzo0Njo1OCBQTSIsIlVzZXJJZCI6InRlc3RAZ21haWwuY29tIiwiUm9sZSI6IkN1c3RvbWVyIiwiVXNlck5hbWUiOiJ0ZXN0QGdtYWlsLmNvbSIsIkVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJleHAiOjE2NzA0Mjg2MTgsImlzcyI6IkpXVEF1dGhlbnRpY2F0aW9uU2VydmVyIiwiYXVkIjoiSldUU2VydmljZUFuZ3VsYXJDbGllbnQifQ.63iWG4E0f6nMZKqHgetsOFtngnGN7CEBsn2MTwB6jks'}
    });

  }

}
