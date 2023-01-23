import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { interval, Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { TestService } from './test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
  
})
export class TestComponent implements OnInit {


  constructor(private testService: TestService, private router: Router, private loginService:LoginService, private jwtHelperService:JwtHelperService) {


    if(this.jwtHelperService.isTokenExpired(this.loginService.currentToken)){

      localStorage.removeItem("userCredentials");
      this.loginService.currentToken = null;
      this.loginService.currentUsername = null;
      this.loginService.currentUsernameFromToken=null;
      this.router.navigate(['/login']);
    }

    // this.router.events.subscribe(x => {
    //   if (x instanceof NavigationStart) {
    //     this.testService.getString().subscribe(x => {
    //       console.log(x);
    //     })
    //   }
    // });

  }

  ngOnInit(): void {

    // link: https://stackoverflow.com/questions/58094544/angular-8-observable-interval-changed
    // interval(3000).subscribe(x => {
    //   console.log(x);
    //   this.testService.getString().subscribe((x) => {
    //     console.log(x);
    //   });

    // })


    this.testService.getUserDetails().subscribe(subscribedData => {
      console.log('Latest Observable Data =>', subscribedData);
    });


  }


  testBehaviorSubject() {
    this.testService.setUserDetails('testic');
  }

}
