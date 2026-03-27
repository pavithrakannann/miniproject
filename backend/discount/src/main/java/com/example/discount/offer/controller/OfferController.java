package com.example.discount.offer.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.offer.dto.OfferRequestDto;
import com.example.discount.offer.dto.OfferResponseDto;
import com.example.discount.offer.service.OfferService;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    @PostMapping("/shop/{storeId}")
    public OfferResponseDto addOffer(@PathVariable Long storeId, @RequestBody OfferRequestDto offer) {
        return offerService.addOffer(storeId, offer);
    }

    @GetMapping("/store/{storeId}")
    public List<OfferResponseDto> getOffers(@PathVariable Long storeId,
                                            @RequestParam(defaultValue = "true") boolean activeOnly) {
        return offerService.getOffersByStore(storeId, activeOnly);
    }

    @PutMapping("/{id}")
    public OfferResponseDto updateOffer(@PathVariable Long id, @RequestBody OfferRequestDto offer) {
        return offerService.updateOffer(id, offer);
    }

    @DeleteMapping("/{id}")
    public String deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return "Offer deleted";
    }
}
