import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { NoteService } from '../../../services/note.service';
import { NoteRequest } from '../../../core/models/note.model';

@Component({
  selector: 'app-note-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-edit.component.html',
})
export class NoteEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private noteService = inject(NoteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  noteForm: FormGroup;

  noteId!: number;

  isSubmitting = false;
  errorMessage = '';

  constructor() {
    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Récupérer l'id depuis l'URL
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Note ID is missing.';
      return;
    }

    this.noteId = Number(id);

    // Charger la note
    this.loadNote();
  }

  loadNote(): void {
    this.noteService.getById(this.noteId).subscribe({
      next: (note) => {
        // Remplir le formulaire avec les données existantes
        this.noteForm.patchValue({
          title: note.title,
          content: note.content,
        });
      },

      error: (error) => {
        console.error('Error loading note:', error);

        this.errorMessage = 'Unable to load the note.';
      },
    });
  }

  onSubmit(): void {
    // Ne pas envoyer si formulaire invalide
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();

      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const request: NoteRequest = {
      title: this.noteForm.value.title,
      content: this.noteForm.value.content,
    };

    // Modifier la note
    this.noteService.updateNote(this.noteId, request).subscribe({
      next: () => {
        // Retour à la liste après modification
        this.router.navigate(['/notes']);
      },

      error: (error) => {
        console.error('Error updating note:', error);

        this.errorMessage = 'Unable to update the note.';

        this.isSubmitting = false;
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
