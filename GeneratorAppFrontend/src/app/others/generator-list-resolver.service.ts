import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, Observable, of } from "rxjs";
import { GeneratorService } from "../generators/generator.service";
import { LoginService } from "../login/login.service";
import { GeneratorInfo } from "../models/GeneratorInfo.model";

@Injectable()
export class GeneratorListResolverService implements Resolve<GeneratorInfo[]> {

    constructor(private generatorService: GeneratorService, private loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService) {


    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): GeneratorInfo[] | Observable<GeneratorInfo[] | any> | Promise<GeneratorInfo[]> {

        if (route.queryParamMap.has('accessToken')) {
            var accessTokenFromUri = route.queryParamMap.get('accessToken');
            if (!this.jwtHelperService.isTokenExpired(accessTokenFromUri)) {
                var newObject: any = {
                    'username': JSON.parse(window.atob(accessTokenFromUri.split('.')[1])).UserName,
                    'status': accessTokenFromUri
                };
                localStorage.setItem('userCredentials', JSON.stringify(newObject));
                this.loginService.currentToken = accessTokenFromUri;
                this.loginService.currentUsername = JSON.parse(window.atob(accessTokenFromUri.split('.')[1])).UserName;
                this.loginService.currentUsernameFromToken = JSON.parse(window.atob(accessTokenFromUri.split('.')[1])).Role;

            }
        }

        return this.generatorService.getGenerators(this.loginService.currentToken).pipe(catchError((err: any) => {

            if (err.status === 401) {
                localStorage.removeItem("userCredentials");
                this.loginService.currentToken = null;
                this.loginService.currentUsername = null;
                this.loginService.currentUsernameFromToken = null;
                this.router.navigate(['/login']);
            }
            else {
                console.log(err.message);
                this.router.navigate(['/notFound']);
            }
            return of(err)
        }));
    }

}