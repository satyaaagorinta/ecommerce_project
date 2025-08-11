import { CommonModule, CurrencyPipe, NgClass, } from '@angular/common';
import { Component,EventEmitter,Input,Output,SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddRemoveCartEvent,CartEventState,Product } from '../../models/products';
import { Products } from '../../services/products';
@Component({
  selector: 'app-cart-card',
  imports: [CommonModule,FormsModule,CurrencyPipe,NgClass],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.scss'
})
export class CartCard {
  @Input() product! :Product;
  @Input() quantity: number = 0;
  @Output() addRemoveCart = new EventEmitter<AddRemoveCartEvent>();
  cartEventState = CartEventState;

  addRemoveCartEvent(eventState: CartEventState){
    const cartEvent: AddRemoveCartEvent = {
      productId: this.product.id as string,
      quantity:this.quantity,
      eventState: eventState,
    };
    this.addRemoveCart.emit(cartEvent);
  }
  

}
