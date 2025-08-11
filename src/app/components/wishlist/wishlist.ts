import { Component ,Input} from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Layout } from '../../pages/app-layout/layout/layout';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Products } from '../../services/products';
import { Product } from '../../models/products';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard,Layout,RouterLink,CommonModule],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss'
})
export class Wishlist {

  @Input()wishlistItems!:Product[];
  constructor(private products:Products) { 
    this.products.wishlistDataObs$.subscribe(items=>{
      this.wishlistItems=items;
    })
  }

}
