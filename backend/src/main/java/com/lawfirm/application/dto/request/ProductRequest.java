package com.lawfirm.application.dto.request;

import com.lawfirm.domain.enums.ProductStatus;

import java.math.BigDecimal;

public record ProductRequest(
    String reference,
    String name,
    String category,
    String description,
    BigDecimal price,
    Integer quantity,
    ProductStatus status
) {
}