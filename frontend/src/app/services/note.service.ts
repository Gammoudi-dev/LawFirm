import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Note, NoteRequest } from '../core/models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/notes`;

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }
  createNote(request: NoteRequest): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, request);
  }
  deleteNote(noteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${noteId}`);
  }
  getById(noteId: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${noteId}`);
  }
  getCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`);
  }
}
