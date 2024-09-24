import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../shared/layout/header/header.component';
import { FooterComponent } from '../shared/layout/footer/footer.component';
// import { CategoryService } from '../core/services/categories.service';
// import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
    NgbModule,
    // BrowserModule,
    CommonModule
  ],
  providers: [
    // CategoryService,
    // ProductService,
  ]
})
export class MainComponent {

}
