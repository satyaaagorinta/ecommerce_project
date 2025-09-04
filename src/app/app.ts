import { Component,AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './pages/app-layout/layout/layout';


import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Layout,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Frontend';


isProductDetailsPage = false;

  constructor(private router: Router) {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe((event: any) => {
    //     this.isProductDetailsPage = event.urlAfterRedirects.startsWith('/products');
    //   });

 this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Show layout for everything except product details
        this.isProductDetailsPage = /^\/products\/\d+/.test(event.urlAfterRedirects);
      });


  }

}
