package com.lawfirm.domain.repository;

import com.lawfirm.domain.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByReference(String reference);

    @Query("SELECT p FROM Product p WHERE "
        + ":search IS NULL OR LOWER(p.reference) LIKE LOWER(CONCAT('%', :search, '%')) "
        + "OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) "
        + "OR LOWER(p.category) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<Product> search(@Param("search") String search, Pageable pageable);

    @Query ("SELECT sum (p.price) FROM Product p")
    Double getTotPRep();
}