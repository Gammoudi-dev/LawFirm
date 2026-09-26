package com.lawfirm.application.service;

import com.lawfirm.application.dto.request.ProductRequest;
import com.lawfirm.application.dto.response.ProductResponse;
import com.lawfirm.application.mapper.ProductMapper;
import com.lawfirm.domain.model.Product;
import com.lawfirm.domain.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class ProductService {

    private final ProductRepository repository;
    private final ProductMapper mapper;

    public ProductService(
            ProductRepository repository,
            ProductMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Page<ProductResponse> search(String search, int page, int size) {
        return repository.search(normalize(search), PageRequest.of(page, size))
                .map(mapper::toResponse);
    }

    private String normalize(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    public ProductResponse findById(Long id) {
        Product product = repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Product not found"));

        return mapper.toResponse(product);
    }

    public ProductResponse create(ProductRequest request) {
        Product product = mapper.toEntity(request);

        Product saved = repository.save(product);

        return mapper.toResponse(saved);
    }

    public ProductResponse update(
            Long id,
            ProductRequest request) {

        Product product = repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Product not found"));

        product.setReference(request.reference());
        product.setName(request.name());
        product.setCategory(request.category());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setQuantity(request.quantity());
        product.setStatus(request.status());

        return mapper.toResponse(repository.save(product));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}