import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { GeneratorInfo } from '../models/GeneratorInfo.model';
import { SignalrService } from '../others/signalr.service';
import { GeneratorService } from './generator.service';

@Component({
  selector: 'app-list-generators',
  templateUrl: './list-generators.component.html',
  styleUrls: ['./list-generators.component.css']
})
export class ListGeneratorsComponent implements OnInit {

  generatorList: GeneratorInfo[];
  filteredGeneratorList:GeneratorInfo[];
  private _searchTerm:string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val:string){
    console.log('Setter is called');
    this._searchTerm=val;
    this.filteredGeneratorList=this.filterGeneratorList(val);
  }
  // colspan:string="svastara";


  constructor(private generatorService: GeneratorService, private router: Router, private loginService: LoginService, private activatedRoute:ActivatedRoute, signalRService:SignalrService) {
    const resolvedData=this.activatedRoute.snapshot.data['generatorList'];
    if(Array.isArray(resolvedData)){
      this.generatorList=resolvedData;
      this.filteredGeneratorList=resolvedData;
      console.log(resolvedData);
      console.log('Konstruktor:');
      console.log(this.filteredGeneratorList);

      //pozovi signalRService:
      signalRService.startConnection();
      // setTimeout(()=>{
      //   signalRService.sendMessage();
      //   signalRService.receivedMessage();

      // },2000);
    }
    else if(resolvedData.status===401){
      localStorage.removeItem("userCredentials");
      this.loginService.currentToken = null;
      this.loginService.currentUsername = null;
      this.loginService.currentUsernameFromToken=null;
      this.router.navigate(['/login']);

    }
    else {
      console.log(resolvedData.message);
      this.router.navigate(['/notFound']);
    }

  

  
  }

  ngOnInit(): void {
    // console.log('OnInit called');
    // var access_token: string = this.loginService.currentToken;
    

    // this.generatorService.getGenerators(access_token).subscribe((generators: GeneratorInfo[]) => {
    //   this.generatorList = generators;
    //   this.filteredGeneratorList=generators;
    // },
    //   (err) => {
    //     if (err.status === 401) {
    //       localStorage.removeItem("userCredentials");
    //       this.loginService.currentToken = null;
    //       this.loginService.currentUsername = null;
    //       this.router.navigate(['/login']);

    //     }
    //     else {
    //       console.log(err.message);
    //       this.router.navigate(['/notFound']);
    //     }
    //   }
    // );



  }


  filterGeneratorList(searchTerm:string){
    return this.generatorList.filter(x=>x.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
  }


  deleteFromListGenerators(id:number){
    console.log('Pocetak delete');
    console.log(this.filteredGeneratorList);
    const idForDeletingFL=this.filteredGeneratorList.findIndex(x=>x.id===id);
    console.log(idForDeletingFL);
    const idForDeletingGL=this.generatorList.findIndex(x=>x.id===id);
    if(idForDeletingFL !==null && idForDeletingGL !==null){
      console.log('if uslov:');
      console.log(this.filteredGeneratorList);
     this.filteredGeneratorList= this.filteredGeneratorList.filter(x=>x.id !== id);
      console.log(this.filteredGeneratorList);
      this.generatorList=this.generatorList.filter(x=>x.id !== id);
      
    }
    else{
      console.log('Generator with id= '+ id+' dont exist!');

    }
    
    
  }

  // clickMe(){
  //   this.colspan=this.colspan+" testic";
  // }
  // clickMe(){
  //   console.log('You click on child');
  // }
  

}
