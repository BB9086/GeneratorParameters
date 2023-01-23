import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserLogin } from '../models/UserLogin.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginDetails: UserLogin = {
    username: null,
    password: null

  };
  error: string;



  constructor(public loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService, private route: ActivatedRoute) { 

   
    
  }

  ngOnInit(): void {

    
      if (this.loginService.currentToken != null) {
        var access_token = this.loginService.currentToken;
        
        if (this.jwtHelperService.isTokenExpired(access_token)) {
          this.loginService.currentToken = null;
          this.loginService.currentUsername = null;
          this.loginService.currentUsernameFromToken=null;
         localStorage.removeItem("userCredentials");
         
  
        }
        else {
          this.router.navigate(['list']);
        }
  
      }

     
    
    
  

  }

  loginUser() {
  
    this.loginService.userLogin(this.userLoginDetails).subscribe(x => {
      if (x.status !== 'Invalid credentials' && x.status !== 'Invalid credentials') {
        localStorage.setItem('userCredentials', JSON.stringify(x));
        this.loginService.currentToken = x.status;
        this.loginService.currentUsername = x.username;
        this.loginService.currentUsernameFromToken=JSON.parse(window.atob(x.status.split('.')[1])).Role;
        this.router.navigate(['/list']);

      }
      else {
        this.error = "Invalid credentials";
        console.log("Invalid credentials!");
      }

    }, (err) => {
      console.log(err.message);
      this.router.navigate(['notFound']);
    });



  }

}
