import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { GeneratorService } from "../generators/generator.service";
import { LoginService } from "../login/login.service";

@Injectable()
export class GeneratorDetailsCanActivateGuardService implements CanActivate{
    /**
     *
     */
    currentid:number;
   
    constructor(private generatorService:GeneratorService, private loginSErvice:LoginService, private router:Router) {
      

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      this.currentid=+route.paramMap.get('id');
     return this.generatorService.getGeneratorById(this.currentid,this.loginSErvice.currentToken).pipe(map(gen=>true),catchError((err:any)=>{


      if (err.status === 401) {
        localStorage.removeItem("userCredentials");
        this.loginSErvice.currentToken = null;
        this.loginSErvice.currentUsername = null;
        this.loginSErvice.currentUsernameFromToken=null;
        // console.log('Greska 401!');
        this.router.navigate(['/login']);

      }
      else {
        console.log(err.message);
        this.router.navigate(['/notFound']);
      }

       return of(false)}) );
     
    }

}