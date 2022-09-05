import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';



@NgModule({
  declarations: [AppComponent],
  // eslint-disable-next-line max-len
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,CommonModule, AngularFireModule.initializeApp(environment.firebaseConfig), AngularFireStorageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy} ],
  bootstrap: [AppComponent],
})
export class AppModule {}
