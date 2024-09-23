import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from '../shared/layout/header/header.component';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { CategoryService } from '../core/services/categories.service';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule
  ],
  providers: [
    CategoryService,
    ProductService
  ]
})
export class MainComponent {

}
