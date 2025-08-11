import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Layout } from '../../pages/app-layout/layout/layout';
import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartCard } from '../cart-card/cart-card';
import { Products } from '../../services/products';
import {
  Product,
  AddRemoveCartEvent,
  CartEventState,
} from '../../models/products';

@Component({
  selector: 'app-cart',
  imports: [
    RouterLink,
    Layout,
    CurrencyPipe,
    FormsModule,
    NgClass,
    CartCard,
    CommonModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartList: Product[] = [];
  distinctCartList: Product[] = [];

  subTotalPrice: number = 0;
  totalTax: number = 0;
  totalPrice: number = 0;

  constructor(private productsService: Products) {
    this.getCartData();
  }

  getCartData() {
    this.productsService.getCartData().subscribe({
      next: (data: Product[]) => {
        this.cartList = data;
        this.distinctCartList = this.getUniqueProducts(this.cartList);
        this.subTotalPrice = this.getSubTotalPrice(this.cartList);
        this.totalTax = this.getTotalTax(this.subTotalPrice);
        this.totalPrice = this.subTotalPrice + this.totalTax;
      },
    });
  }

  getSubTotalPrice(products: Product[]): number {
    let subTotal = 0;
    products.forEach((element: Product) => {
      subTotal += element.price;
    });
    return subTotal;
  }

  getTotalTax(totalPrice: number): number {
    return totalPrice * 0.12;
  }

  getUniqueProducts(products: any[]): any[] {
    const map = new Map<number, any>();
    for (let product of products) {
      map.set(product.id, product);
    }

    return Array.from(map.values());
  }

  getProductQuantity(productId: string): number {
    return this.cartList.filter((element) => element.id === productId).length;
  }

  AddOrRemoveCartItem(event:AddRemoveCartEvent){
    if(event){
      const product = this.distinctCartList.find(
        (product:Product)=> product.id === event.productId);
        if (product){
          if(event.eventState == CartEventState.Add){
            this.addToCart(product);
          }
          else{
            this.removeFromCart(product);
          }
        }
      
    }

  }

  addToCart(product:Product){
    this.cartList.push(product);
    this.setCartData();
    
  }
  removeFromCart(product:Product) {
    const index = this.cartList.findIndex(
      (element: Product) => element.id === product.id
    );
    if(index !== -1) {
      this.cartList.splice(index, 1);
  }
 
  this.setCartData();
}

setCartData() {
  this.productsService.setCartData(this.cartList);
}


}
