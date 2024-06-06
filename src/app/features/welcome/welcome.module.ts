import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { WelcomeLandingComponent } from './components/welcome-landing/welcome-landing.component';
import { WelcomeRoutingModule } from './welcome.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    WelcomePageComponent, 
    WelcomeLandingComponent
  ],
  imports: [
    WelcomeRoutingModule,
    SharedModule,
    TranslateModule.forChild({ extend: true }),
  ]
})
export class WelcomeModule { }
