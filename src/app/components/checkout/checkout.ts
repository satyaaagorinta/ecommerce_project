import { Component, inject, Input, OnInit  } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../../models/products';
import { Products } from '../../services/products';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-checkout',
imports: [
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit{
  isChecked: boolean = false;
  billingForm!: FormGroup;
  @Input() cartQuantity: Product[] = [];

  formBuilder = inject(FormBuilder);
  constructor(
    private router: Router,
    private productsService: Products
  ) {}

  ngOnInit(): void {
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      billingAdressLine1: ['', Validators.required],
      billingAdressLine2: ['', Validators.required],
      billingCountry: ['', Validators.required],
      billingState: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingPostalcode: ['', Validators.required],
      shippingAdressLine1: ['', Validators.required],
      shippingAdressLine2: ['', Validators.required],
      shippingCountry: ['', Validators.required],
      shippingState: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingPostalcode: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cvv: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });
  }
  onCheckboxChange($event: MatCheckboxChange) {
    this.isChecked = $event.checked;

    this.assignShippingDetails();
  }
  assignShippingDetails() {
    const billingAddressLine1 =
      this.billingForm.controls['billingAdressLine1'].value;
    const billingAddressLine2 =
      this.billingForm.controls['billingAdressLine2'].value;
    const billingCountry = this.billingForm.controls['billingCountry'].value;
    const billingState = this.billingForm.controls['billingState'].value;
    const billingCity = this.billingForm.controls['billingCity'].value;
    const billingPostalcode =
      this.billingForm.controls['billingPostalcode'].value;

    if (this.isChecked) {
      this.billingForm.patchValue({
        shippingAdressLine1: billingAddressLine1,
        shippingAdressLine2: billingAddressLine2,
        shippingCountry: billingCountry,
        shippingState: billingState,
        shippingCity: billingCity,
        shippingPostalcode: billingPostalcode,
      });

      const feilds = [
        'shippingAdressLine1',
        'shippingAdressLine2',
        'shippingCountry',
        'shippingState',
        'shippingCity',
      ];
      feilds.forEach((field) => {
        const sameAsAbove = this.billingForm.get(field);
        if (sameAsAbove) {
          sameAsAbove.removeValidators(Validators.required);
          sameAsAbove.updateValueAndValidity();
        }
      });
    } else {
      const feilds = [
        'shippingAdressLine1',
        'shippingAdressLine2',
        'shippingCountry',
        'shippingState',
        'shippingCity',
      ];

      feilds.forEach((field) => {
        this.billingForm.get(field)?.addValidators(Validators.required);
        this.billingForm.get(field)?.updateValueAndValidity();
      });
    }
  }

  setCartCount() {
    this.productsService.setCartData((this.cartQuantity = []));
  }
  onSubmit() {
    if (this.billingForm.valid) {
      this.billingForm.markAllAsTouched();
      this.router.navigate(['/order-confirmation']);

      this.setCartCount();
      console.log('Form Submitted!', this.billingForm.value);
    }
  }
}
