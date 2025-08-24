import { CurrencyPipe, NgClass } from '@angular/common';
import { Component,Input, OnChanges,SimpleChanges, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products';
import { Products } from '../../services/products';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink, NgClass, CurrencyPipe,MatIconModule,FormsModule,CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit,OnChanges {

   @Input() product!: Product;
   @Input() localProduct!: Product;
cartCount: number = 0;
  cartList: Product[] = [];

  productDetails!: Product;
  productId!: string;
  item!: Product;

  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: Products
  ) {
    this.productId = this.route.snapshot.params['id'];
    this.getProductById(this.productId);


 this.getCartData();
   

  }

  ngOnChanges(changes: SimpleChanges): void {
      this.setCartCount();
  }

  ngOnInit(): void {}
  getProductById(id: string) {
    this.productsService.getProductById(id).subscribe((productDetails) => {
      this.productDetails = productDetails;
    });
  }
  backToProductsList() {
    this.router.navigate(['/products']);
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
    this.cartList.push(this.productDetails);
    this.setCartCount();
    this.setCartData();
  }

  setCartCount() {
    this.cartCount = this.cartList.filter(
      (element) => element.id === this.productDetails.id
    ).length;
  }

  removeFromCart() {
    const index = this.cartList.findIndex(
      (element: Product) => element.id === this.productDetails.id
    );
    if(index !== -1) {
      this.cartList.splice(index, 1);
  }
  this.setCartCount();
  this.setCartData();
}
}
