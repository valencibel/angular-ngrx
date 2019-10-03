import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './components/log-in/log-in.component';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule, MatToolbarModule, MatCardModule, MatInputModule, MatDialogModule, MatTableModule, MatListModule, MatCheckboxModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import { appReducers } from './store/app.states';
import { environment } from 'src/environments/environment.prod';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { appReducers } from './store/app.states';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    UserModalComponent,
    SignUpComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects]),
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 100, // retains last 100 states
      logOnly: environment.production
    }),
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule
  ],
  entryComponents: [AlertModalComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
