import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/products';
@Injectable({
  providedIn: 'root',
})
export class Products {
  url: string = 'http://localhost:3000/products';
  httpClient = inject(HttpClient);

  private addToCartData = new BehaviorSubject<Product[]>([]);
  addToCartDataObs$ = this.addToCartData.asObservable();

  private wishlistData = new BehaviorSubject<Product[]>([]);
  public wishlistDataObs$ = this.wishlistData.asObservable();

  private filteredProducts = new BehaviorSubject<Product[]>([]);
  public filteredProductsObs$ = this.filteredProducts.asObservable();

  getCartData() {
    return this.addToCartDataObs$;
  }

  setCartData(inputData: Product[]) {
    this.addToCartData.next(inputData);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/${id}`);
  }

  addToWishlist(product: Product): void {
    const currentWishlist = this.wishlistData.value;
    const existsInWishlist = currentWishlist.find((p) => p.id === product.id);
    if (!existsInWishlist) {
      this.wishlistData.next([...currentWishlist, product]);
    }
  }

  removeFromWishlist(productId: string) {
    const currentWishlist = this.wishlistData.value;
    const updatedWishlist = currentWishlist.filter((p) => p.id !== productId);
    this.wishlistData.next(updatedWishlist);
  }

  isInWishlist(productId: string): boolean {
    const currentWishlist = this.wishlistData.value;
    return currentWishlist.find((p) => p.id == productId) !== undefined;
  }

  searchProducts(products: Product[], keyword: string): void {
    const lowerCaseKeyword = keyword.toLocaleLowerCase();
    const filteredList = products.filter(
      (p) =>
        p.title.toLocaleLowerCase().includes(lowerCaseKeyword) ||
        p.description.toLocaleLowerCase().includes(lowerCaseKeyword) ||
        p.category.toLocaleLowerCase().includes(lowerCaseKeyword)||
        p.collection.toLocaleLowerCase().includes(lowerCaseKeyword)
    );
    this.filteredProducts.next(filteredList);
  }

  searchReset(products:Product[]){
    this.filteredProducts.next(products);
  }
}
