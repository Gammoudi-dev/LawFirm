import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Note } from '../../../core/models/note.model';
import { NoteService } from '../../../services/note.service';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './note-detail.component.html',
})
export class NoteDetailComponent implements OnInit {
  note?: Note;
  loading = true;
  errorMessage = '';

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.noteService.getById(id).subscribe({
      next: (data) => {
        this.note = data;
        this.loading = false;
      },

      error: () => {
        this.errorMessage = 'Erreur lors du chargement de la note';
        this.loading = false;
      },
    });
  }
}
