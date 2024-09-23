import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { CarouselComponent } from './shared/carousel/carousel.component';

import { SharedModule } from './shared/shared.module';

// Toastr
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    SharedModule,
    NgbModule,
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CarouselComponent
  ],
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }