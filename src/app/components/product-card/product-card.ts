import {
  Component,
  inject,
  Input,
  NgModule,
  OnChanges,
  OnInit,
  
  SimpleChanges,
} from '@angular/core';
import { CommonModule, CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { Product } from '../../models/products';
import { Products } from '../../services/products';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NgClass, NgStyle, CurrencyPipe, FormsModule,MatIconModule,CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  host: {
    class: 'product-card-host',
  },
})
export class ProductCard implements OnChanges{
  @Input() product!: Product;
  @Input() localProduct!: Product;

  cartCount: number = 0;
  cartList: Product[] = [];

  wishlistItems:Product[]=[];

  productsService = inject(Products);

  constructor() {
  
    this.getCartData();
    this.productsService.wishlistDataObs$.subscribe(items => {
      this.wishlistItems = items;
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
      this.setCartCount();
  }


  getCartData() {
    this.productsService.getCartData().subscribe({
      next: (data: Product[]) => {
        this.cartList = data;
      },
    });
  }

  setCartData() {
    this.productsService.setCartData(this.cartList);
  }

  addToCart() {
    this.cartList.push(this.product);
    this.setCartCount();
    this.setCartData();
  }

  setCartCount() {
    this.cartCount = this.cartList.filter(
      (element) => element.id === this.product.id
    ).length;
  }

  removeFromCart() {
    const index = this.cartList.findIndex(
      (element: Product) => element.id === this.product.id
    );
    if(index !== -1) {
      this.cartList.splice(index, 1);
  }
  this.setCartCount();
  this.setCartData();
}

addToWishlist(){
  this.productsService.addToWishlist(this.product);
}
removeFromWishlist(){
  this.productsService.removeFromWishlist(this.product.id as string);
}

isInWishlist():boolean{
  return this.productsService.isInWishlist(this.product.id as string)
}

toggleWishlist(product:Product){
  if(this.productsService.isInWishlist(this.product.id as string)){
    this.removeFromWishlist();
  }
  else{
    this.addToWishlist();
  }
}




}
