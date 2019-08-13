import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardingFormComponent } from './form/onboarding-form/onboarding-form.component';
import { DialogService, MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path:"home",component:OnboardingFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
