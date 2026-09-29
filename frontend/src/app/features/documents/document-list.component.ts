import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentSummary } from '../../core/models/document.model';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-list.component.html',
})
export class DocumentListComponent {
  documents = signal<DocumentSummary[] | null>(null);

  showCreateForm = signal(false);

  openCreateForm(): void {
    this.showCreateForm.set(true);
  }

  closeCreateForm(): void {
    this.showCreateForm.set(false);
  }

  
}
