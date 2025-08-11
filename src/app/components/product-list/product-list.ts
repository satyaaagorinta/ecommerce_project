import { Component } from '@angular/core';
// import { Layout } from '../../pages/app-layout/layout/layout';
import { Product } from '../../models/products';
import { Products } from '../../services/products';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule,RouterLink,ProductCard,FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
productArray : Product[] = [];
filteredProductArray : Product[] = [];

constructor(private products: Products) { 
  this.getProducts();
  this.getFilteredProducts();
  this.filteredProductArray =[...this.productArray];
}

getProducts(): void {
  const product: Observable<Product[]> = this.products.getProducts();
  product.subscribe((data: Product[]) => {
    console.log(data);
    this.productArray = data;
  });
}

getFilteredProducts():void{
  this.products.filteredProductsObs$.subscribe((data:Product[])=>{
    console.log(data);
    this.filteredProductArray = data;
    this.productArray =this.filteredProductArray;
  }
  )
}

onSearch(keyword:string){
  if(keyword){
    this.products.searchProducts(this.productArray,keyword);

  }
  else if(keyword === ''){
    this.getProducts();
  }
  else {
    this.products.searchReset(this.productArray);
  }
}





}
