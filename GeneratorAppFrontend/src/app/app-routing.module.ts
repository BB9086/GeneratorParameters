import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGeneratorsComponent } from './generators/list-generators.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './others/page-not-found.component';
import { CreateGeneratorComponent } from './generators/create-generator.component';
import { TestComponent } from './generators/test.component';
import { Test2Component } from './generators/test2.component';
import { DetailsGeneratorComponent } from './generators/details-generator.component';
import { CreateGeneratorCanDeactivateGuardService } from './others/create-generator-can-deactivate-guard.service';
import { GeneratorListResolverService } from './others/generator-list-resolver.service';
import { GeneratorDetailsCanActivateGuardService } from './others/generator-details-canactivate-guard.service';
import { TotalAnnualGeneratorFlowComponent } from './generators/total-annual-generator-flow.component';
import { AppComponent } from './app.component';


const appRoutes: Routes =
  [

    { path: 'list', component: ListGeneratorsComponent, resolve: { generatorList: GeneratorListResolverService } },
    {
      path: 'generators/:id', component: DetailsGeneratorComponent, canActivate:[GeneratorDetailsCanActivateGuardService]
    },
    {
      path: 'edit/:id', component: CreateGeneratorComponent, canDeactivate: [CreateGeneratorCanDeactivateGuardService]
    },
    {
      path: 'totalFlow', component: TotalAnnualGeneratorFlowComponent
    },
    {
      path: 'test', component: TestComponent
    },
    {
      path: 'test2', component: Test2Component
    },
    {
      path: 'login', component: LoginComponent
    },
    {
      path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
      path: 'notFound', component: PageNotFoundComponent
    }
  ];


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [CreateGeneratorCanDeactivateGuardService, GeneratorDetailsCanActivateGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
