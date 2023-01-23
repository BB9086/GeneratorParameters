import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CreateGeneratorComponent } from "../generators/create-generator.component";

@Injectable()
export class CreateGeneratorCanDeactivateGuardService implements CanDeactivate<CreateGeneratorComponent>{
    canDeactivate(component: CreateGeneratorComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(component.generatorCreateForm?.dirty){
            return confirm('Are you shure you want discard your changes?');
        }
        else{
            return true;
        }
    }
    
}