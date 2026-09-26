package com.lawfirm.application.dto.response;

import java.time.LocalDateTime;

public record LawyerResponse(
    Long id,
    String firstName,
    String lastName,
    String fullName,
    String taxId,
    String email,
    String phone,
    LocalDateTime createdDate,
    Boolean active
) {}
