import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Note } from '../../core/models/note.model';
import { NoteCreateComponent } from './note-create.component';
import { NoteService } from '../../services/note.service';
import { NoteEditComponent } from './note-edit/note-edit.component';
@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NoteCreateComponent, NoteEditComponent],
  templateUrl: './note-list.component.html',
})
export class NoteListComponent {
  notes = signal<Note[]>([]);
  noteCount = signal(0);
  showCreateForm = signal(false);

  constructor(private noteService: NoteService) {}
  ngOnInit(): void {
    this.loadNotes();
    this.loadNoteCount();
  }
  loadNotes(): void {
    this.noteService.getAll().subscribe({
      next: (notes: Note[]) => {
        console.log('Notes reçues du backend:', notes);
        this.notes.set(notes);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notes:', error);
      },
    });
  }

  deleteNote(noteId: number): void {
    const confirmed = confirm('Voulez-vous vraiment supprimer ce note ?');

    if (!confirmed) {
      return;
    }

    this.noteService.deleteNote(noteId).subscribe({
      next: () => {
        console.log(`Note with ID ${noteId} deleted successfully.`);
        // Remove the deleted note from the notes signal
        this.notes.set(this.notes().filter((note) => note.id !== noteId));
        this.loadNoteCount();
      },
      error: (error) => {
        console.error(`Error deleting note with ID ${noteId}:`, error);
      },
    });
  }

  openCreateForm(): void {
    this.showCreateForm.set(true);
  }

  closeCreateForm(): void {
    this.showCreateForm.set(false);
  }
  onNoteCreated(): void {
    this.closeCreateForm();
    this.loadNotes();
    this.loadNoteCount(); // Reload the notes after a new note is created
  }
  loadNoteCount(): void {
    this.noteService.getCount().subscribe({
      next: (response: { count: number }) => {
        this.noteCount.set(response.count);
      },
      error: (error: unknown) => {
        console.error('Erreur lors du chargement du nombre de notes', error);
      },
    });
  }
}
