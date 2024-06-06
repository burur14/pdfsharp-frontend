import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { components } from '.';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './store/auth.reducer';
import { AUTH_ACTION_KEY } from './store/auth.store';

@NgModule({
  imports: [
    CommonModule, 
    RouterModule,
    TranslateModule.forChild({ extend: true }),
    SharedModule,
    StoreModule.forFeature(AUTH_ACTION_KEY, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [...components],
  exports: [...components],
})
export class CoreModule { }
