
package com.lawfirm.application.mapper; 

import com.lawfirm.application.dto.request.NoteRequest; 
import com.lawfirm.application.dto.response.NoteResponse; 
import com.lawfirm.domain.model.Note; 
import org.springframework.stereotype.Component;

@Component
public class NoteMapper {

    public Note toEntity(NoteRequest request) {
        Note note = new Note();

        note.setTitle(request.title());
        note.setContent(request.content());

        return note;
    }

    public NoteResponse toResponse(Note note) {
        return new NoteResponse(
            note.getId(),
            note.getTitle(),
            note.getContent()
        );
    }
}