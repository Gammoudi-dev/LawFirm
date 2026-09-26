import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductFormComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  products = signal<Product[]>([]);
  loading = signal(false);
  errorMessage = signal('');
  page = signal(0);
  size = signal(5);
  totalElements = signal(0);
  totalPages = signal(0);
  search = signal('');
  showForm = signal(false);
  editingProduct = signal<Product | null>(null);

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe((value) => {
      this.search.set(value);
      this.page.set(0);
      this.loadProducts();
    });
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.productService.search(this.search() || undefined, this.page(), this.size()).subscribe({
      next: (data) => {
        this.products.set(data.content);
        this.totalElements.set(data.totalElements);
        this.totalPages.set(data.totalPages);
        this.loading.set(false);
      },

      error: () => {
        this.errorMessage.set('Erreur lors du chargement des produits');
        this.loading.set(false);
      },
    });
  }

  onSearchChange(value: string): void {
    this.searchSubject.next(value);
  }

  onPageChange(page: number): void {
    this.page.set(page);
    this.loadProducts();
  }

  onPageSizeChange(value: string): void {
    this.size.set(Number(value));
    this.page.set(0);
    this.loadProducts();
  }

  clearSearch(): void {
    this.search.set('');
    this.searchSubject.next('');
  }

  openCreate(): void {
    this.editingProduct.set(null);
    this.showForm.set(true);
  }

  openEdit(product: Product): void {
    this.editingProduct.set(product);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingProduct.set(null);
  }

  onProductSaved(): void {
    this.closeForm();
    this.loadProducts();
  }

  deleteProduct(id: number): void {
    const confirmed = confirm('Voulez-vous vraiment supprimer ce produit ?');

    if (!confirmed) {
      return;
    }

    this.productService.delete(id).subscribe({
      next: () => {
        this.loadProducts();
      },

      error: () => {
        this.errorMessage.set('Erreur lors de la suppression');
      },
    });
  }
}
