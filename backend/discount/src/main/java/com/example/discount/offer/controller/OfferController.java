package com.example.discount.offer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.offer.entity.Offer;
import com.example.discount.offer.service.OfferService;

@RestController
@RequestMapping("/api/offers")
@CrossOrigin(origins = "http://localhost:3000")
public class OfferController {

    private final OfferService service;

    public OfferController(OfferService service) {
        this.service = service;
    }

    // ✅ ADD OFFER
    @PostMapping("/{storeId}")
    public Offer addOffer(@PathVariable Long storeId,
                          @RequestBody Offer offer) {

        return service.addOffer(storeId, offer);
    }

    // ✅ GET OFFERS
    @GetMapping("/store/{storeId}")
    public List<Offer> getOffers(@PathVariable Long storeId) {
        return service.getOffersByStore(storeId);
    }

    // ✅ DELETE OFFER
    @DeleteMapping("/{id}")
    public String deleteOffer(@PathVariable Long id) {
        service.deleteOffer(id);
        return "Offer deleted";
    }
}
