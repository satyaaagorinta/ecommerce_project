// import { Component } from '@angular/core';
// // import { Layout } from '../../pages/app-layout/layout/layout';
// import { Product } from '../../models/products';
// import { Products } from '../../services/products';
// import { RouterLink } from '@angular/router';
// import { Observable } from 'rxjs';
// import { CommonModule } from '@angular/common';
// import { ProductCard } from '../product-card/product-card';
// import { FormsModule } from '@angular/forms';

// import { ActivatedRoute } from '@angular/router'; // <- ADD


// @Component({
//   selector: 'app-product-list',
//   imports: [CommonModule,RouterLink,ProductCard,FormsModule],
//   templateUrl: './product-list.html',
//   styleUrl: './product-list.scss'
// })
// export class ProductList {
// productArray : Product[] = [];
// filteredProductArray : Product[] = [];

// allProducts: Product[] = []; 

// activeCollection: string | null = null;




// constructor(private products: Products, private route: ActivatedRoute) { 
  
//    this.route.queryParamMap.subscribe(params => {
//       const col = params.get('collection');
//       this.activeCollection = col ? col.toLowerCase() : null;
//       this.applyCollectionFilter(); // re-apply when URL changes
//     });
  
  
  
  
  
//   this.getProducts();
//   this.getFilteredProducts();
//    this.filteredProductArray =[...this.productArray];
// }

// getProducts(): void {
//   const product: Observable<Product[]> = this.products.getProducts();
//   product.subscribe((data: Product[]) => {
//     console.log(data);
//     this.productArray = data;
//   });
// }

// getFilteredProducts():void{
//   this.products.filteredProductsObs$.subscribe((data:Product[])=>{
//     console.log(data);
//     this.filteredProductArray = data;
//     this.productArray =this.filteredProductArray;

//     this.applyCollectionFilter();
//   }
//   )
// }
















// onSearch(keyword:string){
//   if(keyword){
//     this.products.searchProducts(this.productArray,keyword);

//   }
//   else if(keyword === ''){
//     this.getProducts();
//   }
//   else {
//     this.products.searchReset(this.productArray);
//   }
// }


// // === NEW: collection filtering logic ===
//   private applyCollectionFilter(): void {
//     const base = this.productArray ?? [];
//     if (!this.activeCollection) {
//       this.filteredProductArray = base;
//       return;
//     }
//     const key = this.activeCollection;
//     this.filteredProductArray = base.filter(p =>
//       String(p.collection).toLowerCase() === key
//     );
//   }


// }




import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { Product } from '../../models/products';
import { Products } from '../../services/products';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductList {
  // Master list from API
  allProducts: Product[] = [];
  // Base list after search (before collection filter)
  productArray: Product[] = [];
  // Final list shown after applying collection filter
  filteredProductArray: Product[] = [];

  activeCollection: string | null = null;

  // helper placed BEFORE it's used anywhere
  private norm(v: string | undefined | null): string {
    return String(v ?? '').trim().toLowerCase();
  }

  constructor(private products: Products, private route: ActivatedRoute) {
    // react to /products?collection=core, etc.
    this.route.queryParamMap.subscribe(params => {
      const col = params.get('collection');
      this.activeCollection = col ? this.norm(col) : null;
      this.applyCollectionFilter();
    });

    this.getProducts(); // initial load
  }

  // Load once from API
  getProducts(): void {
    const product$: Observable<Product[]> = this.products.getProducts();
    product$.subscribe((data: Product[]) => {
      this.allProducts = Array.isArray(data) ? data : [];
      // start with full list
      this.productArray = this.allProducts.slice();
      this.applyCollectionFilter();
      // console.log('sample', this.allProducts.slice(0, 3));
    });
  }

  // Local search over master list, then re-apply collection filter
  onSearch(keyword: string) {
    const q = (keyword ?? '').trim().toLowerCase();
    if (q) {
      this.productArray = this.allProducts.filter(p =>
        (p.title ?? '').toLowerCase().includes(q) ||
        (p.description ?? '').toLowerCase().includes(q) ||
        (p.category ?? '').toLowerCase().includes(q) ||
        (p.collection ?? '').toLowerCase().includes(q)
      );
    } else {
      this.productArray = this.allProducts.slice();
    }
    this.applyCollectionFilter();
  }

  // Apply collection filter on top of current base list
  private applyCollectionFilter(): void {
    const base = this.productArray || [];
    if (!this.activeCollection) {
      this.filteredProductArray = base;
      return;
    }
    const key = this.activeCollection;
    this.filteredProductArray = base.filter(p =>
      this.norm(p.collection) === key
    );
  }
}





