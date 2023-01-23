import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { GeneratorInfo } from '../models/GeneratorInfo.model';
import { GeneratorService } from './generator.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgForm } from '@angular/forms';
import { SignalrService } from '../others/signalr.service';




@Component({
  selector: 'app-create-generator',
  templateUrl: './create-generator.component.html',
  styleUrls: ['./create-generator.component.css']
})
export class CreateGeneratorComponent implements OnInit {

  photoPreview: boolean = false;
  @ViewChild('generatorForm') generatorCreateForm: NgForm;
  editId: number;
  panelTitle:string;

  generator: GeneratorInfo = {
    id: null,
    name: null,
    apparentPower_MVA: null,
    activePower_MW: null,
    powerFactor: null,
    currentStorageVol_cubm: null,
    producer: null,
    photoPath: null,
    productionYear: null,
    location: null

  }
  constructor(private generatorService: GeneratorService, private router: Router, private loginService: LoginService, private jwtHelperService: JwtHelperService, private activatedRoute: ActivatedRoute, private signalRService:SignalrService) {
    if (this.jwtHelperService.isTokenExpired(this.loginService.currentToken)) {
    //  console.log('tt '+JSON.parse(window.atob(this.loginService.currentToken.split('.')[1])).UserName);

      localStorage.removeItem("userCredentials");
      this.loginService.currentToken = null;
      this.loginService.currentUsername = null;
      this.loginService.currentUsernameFromToken=null;
      this.router.navigate(['/login']);
    }
  
  }

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(paramMap=>{
      this.editId =+paramMap.get('id');

      if (this.editId !== 0) {
        
        this.generatorService.getGeneratorById(this.editId, this.loginService.currentToken).subscribe(generator => {
          this.generator = generator;
          this.panelTitle="Update Generator";
         
        }, (err: any) => {
  
         console.log(err.message);
        });
      }
      else {
        this.generator = {
          id: null,
          name: null,
          apparentPower_MVA: null,
          activePower_MW: null,
          powerFactor: null,
          currentStorageVol_cubm: null,
          producer: null,
          photoPath: null,
          productionYear: null,
          location: null
  
        }
        this.panelTitle="Create Generator";
     
        //ovaj deo koda koristimo za reset kada smo popunili neke vrednosti u editu a onda kliknemo na tab Create i pristanemo da napustimo stranicu, onda iskacu prazna polja ali se validacione poruke nisu resetovale!
        if(!!this.generatorCreateForm){
          this.generatorCreateForm.reset();
        }
       
      }
    });
    
  }

  togglePreview() {
    this.photoPreview = !this.photoPreview;
  }
  saveGeneratorr(gen: GeneratorInfo) {
    if(this.editId===0){

      //mora jer inace nece da prihvati id=null. Vidi uputstvo u wordu!
    gen.id = 0;
    //mora da bi bili tipa number
    gen.activePower_MW = +gen.activePower_MW;
    gen.apparentPower_MVA = +gen.apparentPower_MVA;
    gen.powerFactor = +gen.powerFactor;
    this.generatorService.saveGenerator(gen).subscribe(x => {

      this.generatorCreateForm.reset();
      this.router.navigate(['/list']);

      this.signalRService.sendMessage();


    }, (err: any) => {
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
    else{
      gen.id = this.editId;
    //mora da bi bili tipa number
    gen.activePower_MW = +gen.activePower_MW;
    gen.apparentPower_MVA = +gen.apparentPower_MVA;
    gen.powerFactor = +gen.powerFactor;
    this.generatorService.updateGenerator(gen).subscribe(x => {

      this.generatorCreateForm.reset();
      this.router.navigate(['/list']);

      this.signalRService.sendMessage();


    }, (err: any) => {
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

}
