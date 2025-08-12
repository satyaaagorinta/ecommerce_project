import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products';
import { Products } from '../../services/products';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, RouterLink, NgClass, CurrencyPipe,MatIconModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  productDetails!: Product;
  productId!: string;
  item!: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsSevice: Products
  ) {
    this.productId = this.route.snapshot.params['id'];
    this.getProductById(this.productId);
  }

  ngOnInit(): void {}
  getProductById(id: string) {
    this.productsSevice.getProductById(id).subscribe((productDetails) => {
      this.productDetails = productDetails;
    });
  }
  backToProductsList() {
    this.router.navigate(['/products']);
  }
}
