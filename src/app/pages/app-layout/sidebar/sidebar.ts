import { Component, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Products } from '../../../services/products';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadge } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink,MatBadgeModule,MatButtonModule,MatIconModule,MatSidenavModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true
})
export class Sidebar implements OnInit{
cartQuantity: number = 0;

constructor(private productsService: Products) { 
   
}

ngOnInit():void {
  console.log('Initial cartQuantity:', this.cartQuantity);
  this.productsService.addToCartDataObs$.subscribe(quantity =>{
   
    console.log('Cart update received:', quantity);

    this.cartQuantity = quantity.length;

  })
  console.log('Final cart quantity:', this.cartQuantity);
}
}
