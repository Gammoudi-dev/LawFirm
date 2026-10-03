package com.lawfirm.application.service;

import com.lawfirm.application.dto.request.NoteRequest;
import com.lawfirm.application.dto.response.NoteResponse;
import com.lawfirm.application.mapper.NoteMapper;
import com.lawfirm.domain.model.Note;
import com.lawfirm.domain.repository.NoteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;

    public NoteService(
            NoteRepository noteRepository,
            NoteMapper noteMapper
    ) {
        this.noteRepository = noteRepository;
        this.noteMapper = noteMapper;
    }

    public NoteResponse create(NoteRequest request) {

        Note note = noteMapper.toEntity(request);

        Note savedNote = noteRepository.save(note);

        return noteMapper.toResponse(savedNote);
    }
    public List<NoteResponse> getAll() {
        return noteRepository.findAll()
                .stream()
                .map(noteMapper::toResponse)
                .toList();
    }

    public NoteResponse getById(Long noteId) {
        Note note = noteRepository.findById(noteId).orElseThrow(() -> new IllegalArgumentException("Note not found"));
        return noteMapper.toResponse(note);
    }

    public void delete(Long noteId) {
        noteRepository.deleteById(noteId);
    }

    public NoteResponse update(Long noteId, NoteRequest request) {
        Note existingNote = noteRepository.findById(noteId).orElseThrow(() -> new IllegalArgumentException("Note not found"));

        existingNote.setTitle(request.title());
        existingNote.setContent(request.content());

        Note updatedNote = noteRepository.save(existingNote);

        return noteMapper.toResponse(updatedNote);
    }

    public NoteResponse updatenote(long noteId, NoteRequest request){
            Note exstnote = noteRepository.findById(noteId).orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));
            exstnote.setTitle(request.title());
            exstnote.setContent(request.content());
            Note updatenote = noteRepository.save(exstnote);
            return noteMapper.toResponse(updatenote);

    }

    public long countNotes() {
        return noteRepository.count();
    }
}