import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListGeneratorsComponent } from './generators/list-generators.component';
import { GeneratorService } from './generators/generator.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { CreateGeneratorComponent } from './generators/create-generator.component';
import { TestComponent } from './generators/test.component';
import { TestService } from './generators/test.service';
import { Test2Component } from './generators/test2.component';
import { JwtHelperService, JWT_OPTIONS   } from '@auth0/angular-jwt';
import { ConfirmEqualValidatorDirective } from './others/confirm-equal-validator.directive';
import { DisplayGeneratorComponent } from './generators/display-generator.component';
import { DetailsGeneratorComponent } from './generators/details-generator.component';
import { GeneratorFilterPipe } from './others/generator-filter.pipe';
import { GeneratorListResolverService } from './others/generator-list-resolver.service';
import { TotalAnnualGeneratorFlowComponent } from './generators/total-annual-generator-flow.component';
import { OrderFilterPipe } from './others/order-filter.pipe';
import { SignalrService } from './others/signalr.service';




@NgModule({
  declarations: [
    AppComponent,
    ListGeneratorsComponent,
    LoginComponent,
    CreateGeneratorComponent,
    TestComponent,
    Test2Component,
    ConfirmEqualValidatorDirective,
    DisplayGeneratorComponent,
    DetailsGeneratorComponent,
    GeneratorFilterPipe,
    TotalAnnualGeneratorFlowComponent,
    OrderFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [GeneratorService, LoginService, TestService, GeneratorListResolverService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS } ,JwtHelperService, SignalrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
