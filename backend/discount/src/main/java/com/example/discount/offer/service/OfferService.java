package com.example.discount.offer.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.discount.offer.dto.OfferRequestDto;
import com.example.discount.offer.dto.OfferResponseDto;
import com.example.discount.offer.entity.Offer;
import com.example.discount.offer.entity.OfferTypeMapper;
import com.example.discount.offer.repository.OfferRepository;
import com.example.discount.store.entity.Store;
import com.example.discount.store.service.StoreService;

@Service
public class OfferService {

    private final OfferRepository offerRepository;
    private final StoreService storeService;

    public OfferService(OfferRepository offerRepository, StoreService storeService) {
        this.offerRepository = offerRepository;
        this.storeService = storeService;
    }

    public OfferResponseDto addOffer(Long storeId, OfferRequestDto request) {
        Store store = storeService.getStoreEntity(storeId);
        Offer offer = new Offer();
        applyRequest(offer, request);
        offer.setStore(store);
        return mapToResponse(offerRepository.save(offer));
    }

    public List<OfferResponseDto> getOffersByStore(Long storeId, boolean activeOnly) {
        return offerRepository.findByStoreIdOrderByEndDateAsc(storeId)
                .stream()
                .map(this::mapToResponse)
                .filter(offer -> !activeOnly || offer.isActive())
                .collect(Collectors.toList());
    }

    public OfferResponseDto updateOffer(Long offerId, OfferRequestDto request) {
        Offer offer = offerRepository.findById(offerId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Offer not found"));
        applyRequest(offer, request);
        return mapToResponse(offerRepository.save(offer));
    }

    public void deleteOffer(Long id) {
        if (!offerRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Offer not found");
        }
        offerRepository.deleteById(id);
    }

    private void applyRequest(Offer offer, OfferRequestDto request) {
        if (request.getTitle() == null || request.getDescription() == null || request.getType() == null
                || request.getStartDate() == null || request.getEndDate() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Title, description, type, start date, and end date are required");
        }

        if (request.getEndDate().isBefore(request.getStartDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "End date cannot be before start date");
        }

        try {
            OfferTypeMapper.toType(request.getType());
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Offer type must be PERCENTAGE, PRODUCT, COMBO, or SERVICE");
        }

        offer.setTitle(request.getTitle().trim());
        offer.setDescription(request.getDescription().trim());
        offer.setType(OfferTypeMapper.toDatabaseValue(request.getType()));
        offer.setStartDate(request.getStartDate());
        offer.setEndDate(request.getEndDate());
    }

    private OfferResponseDto mapToResponse(Offer offer) {
        OfferResponseDto response = new OfferResponseDto();
        response.setId(offer.getId());
        response.setTitle(offer.getTitle());
        response.setDescription(offer.getDescription());
        try {
            response.setType(OfferTypeMapper.toResponseValue(offer.getType()));
        } catch (IllegalArgumentException ex) {
            response.setType("UNKNOWN");
        }
        response.setStartDate(offer.getStartDate());
        response.setEndDate(offer.getEndDate());
        response.setActive(isOfferActive(offer));
        return response;
    }

    public static boolean isOfferActive(Offer offer) {
        LocalDate today = LocalDate.now();

        if (offer.getStartDate() == null && offer.getEndDate() == null) {
            return true;
        }

        if (offer.getStartDate() == null) {
            return !today.isAfter(offer.getEndDate());
        }

        if (offer.getEndDate() == null) {
            return !today.isBefore(offer.getStartDate());
        }

        return !today.isBefore(offer.getStartDate()) && !today.isAfter(offer.getEndDate());
    }
}
