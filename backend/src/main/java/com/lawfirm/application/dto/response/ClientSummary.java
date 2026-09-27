package com.lawfirm.application.dto.response;

import com.lawfirm.domain.model.ClientType;

import java.time.LocalDate;

public record ClientSummary(
    Long id,
    String fullName,
    ClientType clientType,
    String cin,
    String taxNumber,
    String phone,
    String email,
    String country,
    Boolean active,
    int caseCount,
    LocalDate dateOfBirth
) {}
