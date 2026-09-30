package com.lawfirm.application.dto.request;

import jakarta.validation.constraints.NotBlank;

public class NoteRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

   
}