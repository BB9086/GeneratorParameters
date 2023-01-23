import { Pipe, PipeTransform } from "@angular/core";
import { GeneratorInfo } from "../models/GeneratorInfo.model";

@Pipe({
    name:'filterGenerator'
})
export class GeneratorFilterPipe implements PipeTransform{
    transform(generators: GeneratorInfo[], searchTerm:string) {
        if(!searchTerm){
            return generators;
        }else{
          return  generators.filter(x=>x.name.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
        }
    }
    /**
     *
     */
    constructor() {
       console.log('Filter pipe called!');

    }
    
}