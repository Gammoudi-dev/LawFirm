package com.lawfirm.application.dto.request;

import jakarta.validation.constraints.NotBlank;

public record NoteRequest( String title,String content)
{}