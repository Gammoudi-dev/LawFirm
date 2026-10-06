package com.lawfirm.presentation.controller;

import com.lawfirm.application.dto.request.ProductRequest;
import com.lawfirm.application.dto.response.ProductResponse;
import com.lawfirm.application.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    @PreAuthorize("hasPermission(null, 'PRODUCT_READ')")
    public Page<ProductResponse> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        return service.search(search, page, size);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasPermission(null, 'PRODUCT_READ')")
    public ProductResponse findById(
            @PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public ProductResponse create(
            @RequestBody ProductRequest request) {
        return service.create(request);
    }

    @PutMapping("/{id}")
    public ProductResponse update(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    @GetMapping("/totalprice")
    public void totalPrice() {
        service.totpservice();
    }
}