import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentCategory } from '../../core/models/document.model';
@Component({
  selector: 'app-document-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './document-create.component.html',
})
export class DocumentCreateComponent {
  constructor(private router: Router) {}
  @Input() embedded = false;
  @Output() cancelled = new EventEmitter<void>();

  documentForm = new FormGroup({
    caseId: new FormControl<number | null>(null, Validators.required),

    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),

    description: new FormControl<string>('', {
      nonNullable: true,
    }),

    category: new FormControl<DocumentCategory>('AUTRE', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    file: new FormControl<File | null>(null, Validators.required),
  });
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (file) {
      this.documentForm.controls.file.setValue(file);
    }
  }

  cancel(): void {
    if (this.embedded) {
      this.cancelled.emit();
    } else {
      this.router.navigate(['/documents']);
    }
  }
}
