import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from "@angular/forms";

@Directive({
    selector:'[appConfirmEqualValidator]',
    providers: [
        {
            //ubacuje ga u grupu validatora NG_VALIDATORS
            provide: NG_VALIDATORS,
            useExisting: ConfirmEqualValidatorDirective,
            multi: true
        }]

})
export class ConfirmEqualValidatorDirective implements Validator{

    //P.S. mozes i ovo input polje da koristis kao atribut u passwordGroup html objektu. Vidi uputstvo!!!
    // @Input() cfConfig:string;
    validate(passwordGroup: AbstractControl<any, any>): ValidationErrors {
        // console.log(this.cfConfig);

        const passwordControl=passwordGroup.get('password');
        const confirmPasswordControl=passwordGroup.get('confirmPassword');
        if(passwordControl && confirmPasswordControl && passwordControl.value!==confirmPasswordControl.value){
            return {'notEqual':true}
        }
        else{
            return null;
        }
        

       
    }
    registerOnValidatorChange?(fn: () => void): void {
       console.log("Method not implemented.");
    }

}