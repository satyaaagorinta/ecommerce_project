import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './pages/login/login';
import { ProductList } from './components/product-list/product-list';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { Wishlist } from './components/wishlist/wishlist';
import { Checkout } from './components/checkout/checkout';
import { OrderConfirmation } from './components/order-confirmation/order-confirmation';
import { AddProduct } from './components/add-product/add-product';

export const routes: Routes = [
    {
        path: 'home',
        component: Home,
        
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'products',
        component: ProductList,
        
      },
      {
        path: 'products/:id',
        component: ProductDetails,
        
      },
      {
        path: 'cart',
        component: Cart,
        
      },
      {
        path: 'wishlist',
        component: Wishlist,
        
      },
      {
        path: 'checkout',
        component: Checkout,
        
      },
      {
        path: 'order',
        component: OrderConfirmation,
        
      },
      {
        path: 'add-product',
        component: AddProduct,
        
      },
      // {
      //   path: 'catalog',
      //   component: C,
        
      // },

];
