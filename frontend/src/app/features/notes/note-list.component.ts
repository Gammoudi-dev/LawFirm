import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Note } from '../../core/models/note.model';
import { NoteCreateComponent } from './note-create.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, NoteCreateComponent],
  templateUrl: './note-list.component.html',
})
export class NoteListComponent {
  notes = signal<Note[]>([]);

  showCreateForm = signal(false);

  openCreateForm(): void {
    this.showCreateForm.set(true);
  }

  closeCreateForm(): void {
    this.showCreateForm.set(false);
  }
}
