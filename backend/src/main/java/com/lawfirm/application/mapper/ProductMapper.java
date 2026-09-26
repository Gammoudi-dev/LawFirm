package com.lawfirm.application.mapper;

import com.lawfirm.application.dto.request.ProductRequest;
import com.lawfirm.application.dto.response.ProductResponse;
import com.lawfirm.domain.model.Product;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product product) {
        return new ProductResponse(
            product.getId(),
            product.getReference(),
            product.getName(),
            product.getCategory(),
            product.getDescription(),
            product.getPrice(),
            product.getQuantity(),
            product.getStatus(),
            product.getCreatedAt()
        );
    }

    public Product toEntity(ProductRequest request) {
        Product product = new Product();

        product.setReference(request.reference());
        product.setName(request.name());
        product.setCategory(request.category());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setQuantity(request.quantity());
        product.setStatus(request.status());
        product.setCreatedAt(LocalDateTime.now());

        return product;
    }
}