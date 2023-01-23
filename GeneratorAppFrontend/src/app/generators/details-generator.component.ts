import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from '../login/login.service';
import { GeneratorInfo } from '../models/GeneratorInfo.model';
import { GeneratorService } from './generator.service';

@Component({
  selector: 'app-details-generator',
  templateUrl: './details-generator.component.html',
  styleUrls: ['./details-generator.component.css']
})
export class DetailsGeneratorComponent implements OnInit {

  currentId: number;
  currentGenerator: GeneratorInfo;
  idsArray: number[]=[];
  isMobileResolution: boolean=false;
  isMiniMobileResolution: boolean=false;


  constructor(private activatedRoute: ActivatedRoute, private generatorService: GeneratorService, private loginService: LoginService, private router:Router) {
    //Link za male prozore u angularu: https://betterprogramming.pub/creating-angular-webapp-for-multiple-views-and-screen-sizes-50fe8a83c433
    if(window.innerWidth<768 && window.innerWidth>423){
      this.isMobileResolution=true;
    }
    else if(window.innerWidth<423){
      this.isMiniMobileResolution=true;
    }
   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.currentId = +paramMap.get('id');
      this.generatorService.getGeneratorById(this.currentId, this.loginService.currentToken).subscribe(generator => {
        this.currentGenerator = generator;
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

    });
  }

  GoToNextEmloyee() {

    this.generatorService.getGenerators(this.loginService.currentToken).subscribe(generatorList=>{
      

      this.idsArray=[];
      generatorList.forEach(generator=>{
        
        
        this.idsArray.push(generator.id);

      });

      
      this.idsArray.sort((a,b) => a - b);
     
      
      //find min and max valu ein array: https://stackoverflow.com/questions/51840141/find-smallest-largest-element-in-array-angular-typescript
      var maxElement = this.idsArray.reduce((a, b)=>Math.max(a, b)); 
      var minElement=  this.idsArray.reduce((a, b)=>Math.min(a, b)); 

       var curr=this.currentId;
    
       //link za for u angularu : https://stackoverflow.com/questions/46213989/iterate-over-array-of-objects-in-typescript

      for(let i=0; i<this.idsArray.length; i++){

        if(curr < this.idsArray[i]){
          curr=this.idsArray[i];
         break;
         
        }
        else if(curr==maxElement){
          curr=this.idsArray[0];
          // curr=minElement;
          break;
          
        }
      
      }  
      this.router.navigate(['/generators', curr]);
      

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
