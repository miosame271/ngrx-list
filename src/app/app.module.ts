import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatButtonModule, MatIconModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer, routerReducer } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { listReducer } from './store/list.reducer';
import { CustomSerializer } from './store/custom-router.reducer';

import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    AppRoutingModule,
    StoreModule.forRoot({
      list: listReducer,
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    })
  ],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
