package com.example.discount.offer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.discount.offer.entity.Offer;

public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByStoreIdOrderByEndDateAsc(Long storeId);
}
