import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product, ProductRequest } from '../../../core/models/product.model';

import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product: Product | null = null;
  @Input() embedded = false;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  productForm!: FormGroup;

  isEditMode = false;
  productId?: number;

  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.populateForm();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && !this.product) {
      this.loading = true;
      this.productService.getById(id).subscribe({
        next: (product) => {
          this.product = product;
          this.populateForm();
          this.loading = false;
        },
        error: () => {
          this.errorMessage = 'Erreur lors du chargement du produit';
          this.loading = false;
        },
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.productForm) {
      this.populateForm();
    }
  }

  private createForm(): void {
    this.productForm = this.fb.group({
      reference: ['', Validators.required],

      name: ['', Validators.required],

      category: [''],

      description: [''],

      price: [0, [Validators.required, Validators.min(0)]],

      quantity: [0, [Validators.required, Validators.min(0)]],

      status: ['ACTIVE', Validators.required],
    });
  }

  private populateForm(): void {
    if (!this.product) {
      this.isEditMode = false;
      this.productId = undefined;
      this.productForm.reset({
        reference: '',
        name: '',
        category: '',
        description: '',
        price: 0,
        quantity: 0,
        status: 'ACTIVE',
      });
      return;
    }
    this.isEditMode = true;
    this.productId = this.product.id;
    this.productForm.patchValue(this.product);
  }

  cancel(): void {
    if (this.embedded) {
      this.cancelled.emit();
    } else {
      this.router.navigate(['/products']);
    }
  }

  save(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();

      return;
    }

    const product: ProductRequest = this.productForm.value;

    this.loading = true;

    if (this.isEditMode && this.productId) {
      this.productService.update(this.productId, product).subscribe({
        next: () => {
          this.loading = false;
          this.saved.emit();
          if (!this.embedded) this.router.navigate(['/products']);
        },

        error: () => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la modification';
        },
      });
    } else {
      this.productService.create(product).subscribe({
        next: () => {
          this.loading = false;
          this.saved.emit();
          if (!this.embedded) this.router.navigate(['/products']);
        },

        error: () => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de la création';
        },
      });
    }
  }
}
