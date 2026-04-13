import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RegisterCitizenFormComponent } from './register-citizen-form/register-citizen-form.component';
import { RegisterProviderFormComponent } from './register-provider-form/register-provider-form.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    RegisterCitizenFormComponent,
    RegisterProviderFormComponent
  ],
  imports: [SharedModule],
  exports: [
    LoginPageComponent,
    RegisterPageComponent,
    RegisterCitizenFormComponent,
    RegisterProviderFormComponent
  ]
})
export class AuthModule { }
