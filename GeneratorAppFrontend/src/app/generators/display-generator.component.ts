import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { GeneratorInfo } from '../models/GeneratorInfo.model';
import { SignalrService } from '../others/signalr.service';
import { GeneratorService } from './generator.service';

@Component({
  selector: 'app-display-generator',
  templateUrl: './display-generator.component.html',
  styleUrls: ['./display-generator.component.css']
})
export class DisplayGeneratorComponent implements OnInit {

  @Input() generator: GeneratorInfo;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  generatorOptionalId: number;
  isHidden:boolean=false;
  isMobileResolution:boolean=false;
  isMiniMobileResolution:boolean=false;

  confirmDelete = false;
  constructor(private router: Router, private generatorService: GeneratorService, private loginService: LoginService, private activatedRoute: ActivatedRoute, private signalRService:SignalrService) {
    console.log("Pozvan displayGeneratorComponnet!");
    if(window.innerWidth<768 && window.innerWidth>423){
      this.isMobileResolution=true;
    }
    else if(window.innerWidth<423){
      this.isMiniMobileResolution=true;
    }
   
  }


  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.has('id')) {
      this.generatorOptionalId = +this.activatedRoute.snapshot.queryParamMap.get('id');
      
    }

  }


  viewGenerator() {
    this.router.navigate(['/generators/', this.generator.id]);

  }
  editGenerator() {
    this.router.navigate(['/edit', this.generator.id]);

  }
  deleteGenerator() {
    this.generatorService.deleteGenerator(this.generator.id, this.loginService.currentToken).subscribe(x => {
      this.notifyDelete.emit(this.generator.id);
      this.signalRService.sendMessage();

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
