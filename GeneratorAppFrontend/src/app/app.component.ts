import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './login/login.service';
import { LoginResponse } from './models/LoginResponse.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Generator_AngularApp';
  showLoadingIndicator: boolean;
  previousUrl: string;

  constructor(private router: Router, public loginService: LoginService, private activatedRoute: ActivatedRoute, private jwtHelperService: JwtHelperService) {

    this.router.events

      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          // console.log('prev:', this.previousUrl);
          this.previousUrl = e.url;
          //za testiranje:
           console.log('previous:'+this.previousUrl);

          const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));

          

          if (userCredentials !== null && userCredentials !== undefined) {
            this.loginService.currentToken = userCredentials.status;
            this.loginService.currentUsername = userCredentials.username;
            this.loginService.currentUsernameFromToken = JSON.parse(window.atob(userCredentials.status.split('.')[1])).Role;
          }
          if (this.previousUrl.search('token') !== -1 && (userCredentials === null || userCredentials === undefined)) {
            console.log(this.previousUrl.split('token=',2)[1]);
            var token=this.previousUrl.split('token=',2)[1];

            this.router.navigate(['/list'],{
              queryParams:{'accessToken':token}
            });

           }


        }

          
           

        //       const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));

        //     if (userCredentials !== null && userCredentials !== undefined) {
        //       this.loginService.currentToken = userCredentials.status;
        //       this.loginService.currentUsername = userCredentials.username;
        //       this.loginService.currentUsernameFromToken = JSON.parse(window.atob(userCredentials.status.split('.')[1])).Role;


        //     }
        //       this.router.navigate(['/login']);
        //     }

          
        //   else {


        //    console.log('imam token u url-uuuu: '+this.previousUrl);

        //    this.router.navigate(['/login']);


        //   }

        //   // if(this.previousUrl.search('token')!==0){

        //   // }

        // }

      });

      //samo ovo dole bilo ranije, bez else, ovo iznad je ubaceno zbog pristupa mobilne aplikacije sa tokenom:

    // const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));

    // if (userCredentials !== null && userCredentials !== undefined) {
    //   this.loginService.currentToken = userCredentials.status;
    //   this.loginService.currentUsername = userCredentials.username;
    //   this.loginService.currentUsernameFromToken = JSON.parse(window.atob(userCredentials.status.split('.')[1])).Role;


    // }


    // else {
    //   this.router.navigate(['/login'], {queryParamsHandling:'preserve'});
    // }

  }

  ngOnInit(): void {

    this.router.events.subscribe(routerEvent => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      else if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationCancel ||
        routerEvent instanceof NavigationError) {
        this.showLoadingIndicator = false;
      }

    });

  }

  logout() {
    this.loginService.currentToken = null;
    this.loginService.currentUsername = null;
    this.loginService.currentUsernameFromToken = null;
    localStorage.removeItem("userCredentials");

    this.router.navigate(['/login']);
  }



}
