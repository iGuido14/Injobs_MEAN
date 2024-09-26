import { Route } from "@angular/router";
import { ShopComponent } from "./shop.component";

export default [
    { path: '', component: ShopComponent },
    { path: 'categories/:slug', component: ShopComponent },
    { path: ':filters', component: ShopComponent }
] as Route[]