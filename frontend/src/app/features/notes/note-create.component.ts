import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NoteRequest } from '../../core/models/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-create.component.html',
})
export class NoteCreateComponent {
  @Input() embedded = false;

  @Output() cancelled = new EventEmitter<void>();

  @Output() created = new EventEmitter<void>();

  isSubmitting = false;

  errorMessage = '';

  noteForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),

    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private noteService: NoteService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    const request: NoteRequest = {
      title: this.noteForm.controls.title.value,
      content: this.noteForm.controls.content.value,
    };

    this.isSubmitting = true;

    this.noteService.createNote(request).subscribe({
      next: (note) => {
        console.log('Note created successfully:', note);

        this.isSubmitting = false;

        this.created.emit();

        if (!this.embedded) {
          this.router.navigate(['/notes']);
        }
      },

      error: (error: unknown) => {
        console.error('Error creating note:', error);

        this.isSubmitting = false;

        this.errorMessage = 'Une erreur est survenue lors de la création de la note.';
      },
    });
  }

  cancel(): void {
    if (this.embedded) {
      this.cancelled.emit();
    } else {
      this.router.navigate(['/notes']);
    }
  }
}
