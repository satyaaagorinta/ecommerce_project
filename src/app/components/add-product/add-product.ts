import { Component , inject, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
  NgModel,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Products } from '../../services/products';
import {
  Product,
  ProductOperation,
  DisplayProductForm,
} from '../../models/products';
@Component({
  selector: 'app-add-product',
  imports: [MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss'
})
export class AddProduct implements OnInit{
addProductForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  idInput: string = '';
  DisplayProductForm = DisplayProductForm;

  notFound: DisplayProductForm = DisplayProductForm.None;
  ProductOperation = ProductOperation;
  displayProductOperation: ProductOperation = ProductOperation.Select;

  constructor(
    private router: Router,
    private productService: Products
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  displayAddProduct() {
    this.displayProductOperation = ProductOperation.AddNew;
  }

  displayUpdateProduct() {
    this.displayProductOperation = ProductOperation.Update;
  }

  onSubmit() {
    const id = this.idInput;
    if (this.addProductForm.valid) {
      this.addProductForm.markAllAsTouched();

      if (this.displayProductOperation === ProductOperation.AddNew) {
        this.addNewProduct();
        this.router.navigate(['/product-list']);
      }
      if (this.displayProductOperation === ProductOperation.Update) {
        this.updateProduct();
        console.log('update-from onsubmit');
        this.router.navigate(['/product-list']);
      }
    }
  }

  addNewProduct() {
    const newProduct = this.patchProduct();
    this.productService.addProduct(newProduct).subscribe({
      next: (result: Product) => {
        console.log('successful Adding!', result);
      },
    });
  }

  get imageUrl(): string {
    return this.addProductForm.get('image')?.value;
  }

  patchProduct(): Product {
    const formValue = this.addProductForm.value;
    const newProduct: Product = {
      title: formValue.title,
      category: formValue.category,
      price: formValue.price,
      image: formValue.image,
      description: formValue.description,
     collection: formValue.collection
    };
    return newProduct;
  }
  clearForm() {
    this.addProductForm.reset();
  }
  fetchProduct() {
    this.productService.fetchProductForm(this.idInput).subscribe({
      next: (data: Product) => {
        this.addProductForm.patchValue(data);
        if (!this.addProductForm.contains('rating')) {
          this.addProductForm.addControl(
            'rating',
            this.formBuilder.group({
              rate: [0],
              count: [0],
            })
          );
        }
        this.notFound = DisplayProductForm.True;
      },
      error: () => {
        this.notFound = DisplayProductForm.False;
        this.clearForm();
      },
    });
  }

  updateProduct() {
    const updatedProduct = this.addProductForm.value;
    updatedProduct.id = this.idInput;
    this.productService.updateProduct(updatedProduct).subscribe((response) => {
      console.log('updated', response);
      alert('product updated');
    });
  }
}
