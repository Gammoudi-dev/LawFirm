package com.lawfirm.presentation.controller;
import com.lawfirm.application.dto.request.NoteRequest;
import com.lawfirm.application.dto.response.NoteResponse;
import com.lawfirm.application.service.NoteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public NoteResponse createNote(@Valid @RequestBody NoteRequest request) {
        return noteService.create(request);
    }

    @GetMapping
    public List<NoteResponse> getAllNotes() {
        return noteService.getAll();
    }

    @DeleteMapping("/{noteId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)  
    public void deleteNote(@PathVariable Long noteId) {
        noteService.delete(noteId);
    } 

    @GetMapping("/{noteId}")
    public NoteResponse getNoteById(@PathVariable Long noteId) {
        return noteService.getById(noteId);
    }   
    
}

