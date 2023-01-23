import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { GeneratorInfo } from '../models/GeneratorInfo.model';
import { GeneratorService } from './generator.service';

@Component({
  selector: 'app-total-annual-generator-flow',
  templateUrl: './total-annual-generator-flow.component.html',
  styleUrls: ['./total-annual-generator-flow.component.css']
})
export class TotalAnnualGeneratorFlowComponent implements OnInit, OnDestroy {
  generators: GeneratorInfo[];
  subscription:Subscription;

  constructor(private router: Router, private loginService: LoginService, private jwtHelperService: JwtHelperService, private generatorService: GeneratorService) {
    
    
    if (this.jwtHelperService.isTokenExpired(this.loginService.currentToken)) {

      localStorage.removeItem("userCredentials");
      this.loginService.currentToken = null;
      this.loginService.currentUsername = null;
      this.loginService.currentUsernameFromToken = null;
      this.router.navigate(['/login']);
    }
  this.subscription= this.generatorService.getCurrentFlowDetails().subscribe(gens=>{
      
      this.generators=gens;
      // console.log('testtt');
    });
    
  }
 
  ngOnDestroy(): void {
    //obavezno se unsubscribe iz subscribea, inace ce radnje unutar subscribea da se dupliraju u zavisnosti koliko subskrajbera, tacnije instanci ove komponente TotalAnnualGeneratorFlow imas!
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
   
    this.generatorService.getGenerators(this.loginService.currentToken).subscribe(generators => {
      this.generators = generators;
     

    }, (err: any) => {
      if (err.status === 401) {
        localStorage.removeItem("userCredentials");
        this.loginService.currentToken = null;
        this.loginService.currentUsername = null;
        this.loginService.currentUsernameFromToken = null;
        // console.log('Greska 401!');
        this.router.navigate(['/login']);

      }
      else {
        console.log(err.message);
        this.router.navigate(['/notFound']);
      }
    });


    
  }


  refreshGeneratorList(){
    let genList:GeneratorInfo[];
    this.generatorService.getGenerators(this.loginService.currentToken).subscribe(generators=>{
      genList=generators;
      this.generatorService.setCurrentFlowDetails(genList);
    }, (err:any)=>{
      if (err.status === 401) {
        localStorage.removeItem("userCredentials");
        this.loginService.currentToken = null;
        this.loginService.currentUsername = null;
        this.loginService.currentUsernameFromToken=null;
        // console.log('Greska 401!');
        this.router.navigate(['/login']);

      }
      else {
        console.log(err.message);
        this.router.navigate(['/notFound']);
      }

    });
    
  }

}
