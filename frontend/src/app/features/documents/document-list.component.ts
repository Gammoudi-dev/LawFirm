import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { DocumentSummary } from '../../../core/models/document.model';
@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-list.component.html',
})
export class DocumentListComponent {
  documents = signal<DocumentSummary[] | null>(null);
}
