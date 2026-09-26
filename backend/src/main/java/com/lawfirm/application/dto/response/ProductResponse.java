package com.lawfirm.application.dto.response;

import com.lawfirm.domain.enums.ProductStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductResponse(
    Long id,
    String reference,
    String name,
    String category,
    String description,
    BigDecimal price,
    Integer quantity,
    ProductStatus status,
    LocalDateTime createdAt
) {
}