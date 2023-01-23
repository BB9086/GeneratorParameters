import { Pipe, PipeTransform } from "@angular/core";
import { GeneratorInfo } from "../models/GeneratorInfo.model";

@Pipe(
    {
        name:'changeOrder'
    }
)
export class OrderFilterPipe implements PipeTransform
{
    
    transform(generators: GeneratorInfo[]) :GeneratorInfo[] {
       
        if(!generators){
            return generators;
        }
        else{
            //od izuzetnog je znacaja da ubacis splice() pre reverse() jer reverse() menja raspored na postojecem nizu, dok slice() pravi novu kopiju objekta!!!,
            //a ovaj filter koristim na dva mesta u html-u. Reverse prvi put i uradi dobro, dok drugi put menja raspored na vec izmenjenom redoslediu pa moze nastati peripertija...
          return  generators.slice().reverse();
        }
        
    }
    


}