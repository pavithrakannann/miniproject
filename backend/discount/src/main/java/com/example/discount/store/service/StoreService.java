package com.example.discount.store.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.discount.store.dto.StoreRequestDto;
import com.example.discount.store.dto.StoreResponseDto;
import com.example.discount.store.entity.Store;
import com.example.discount.store.repository.StoreRepository;
import com.example.discount.offer.service.OfferService;
import com.example.discount.user.entity.User;
import com.example.discount.user.entity.UserRole;
import com.example.discount.user.entity.UserRoleMapper;
import com.example.discount.user.repository.UserRepository;

@Service
public class StoreService {

    private final StoreRepository storeRepository;
    private final UserRepository userRepository;

    public StoreService(StoreRepository storeRepository, UserRepository userRepository) {
        this.storeRepository = storeRepository;
        this.userRepository = userRepository;
    }

    public StoreResponseDto saveStoreWithUser(StoreRequestDto request, Long userId) {
        User owner = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (UserRoleMapper.toRole(owner.getRole()) != UserRole.STORE_OWNER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only store owners can add shops");
        }

        Store store = new Store();
        applyRequest(store, request);
        store.setOwner(owner);

        return mapToResponse(storeRepository.save(store));
    }

    public List<StoreResponseDto> getStoresByUserId(Long userId) {
        return storeRepository.findByOwnerId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<StoreResponseDto> getAllStores() {
        return storeRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public StoreResponseDto getStoreById(Long id) {
        return mapToResponse(getStoreEntity(id));
    }

    public StoreResponseDto updateStore(Long id, StoreRequestDto request) {
        Store existingStore = getStoreEntity(id);
        applyRequest(existingStore, request);
        return mapToResponse(storeRepository.save(existingStore));
    }

    public void deleteStore(Long id) {
        if (!storeRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Shop not found");
        }
        storeRepository.deleteById(id);
    }

    public Store getStoreEntity(Long id) {
        return storeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Shop not found"));
    }

    private void applyRequest(Store store, StoreRequestDto request) {
        if (request.getName() == null || request.getName().trim().isEmpty()
                || request.getCategory() == null || request.getCategory().trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shop name and category are required");
        }

        store.setName(request.getName().trim());
        store.setCategory(request.getCategory().trim());
        store.setAddress(request.getAddress() == null || request.getAddress().trim().isEmpty()
                ? null
                : request.getAddress().trim());
        store.setLatitude(request.getLatitude());
        store.setLongitude(request.getLongitude());
    }

    private StoreResponseDto mapToResponse(Store store) {
        StoreResponseDto response = new StoreResponseDto();
        response.setId(store.getId());
        response.setName(store.getName());
        response.setCategory(store.getCategory());
        response.setAddress(store.getAddress());
        response.setLatitude(store.getLatitude());
        response.setLongitude(store.getLongitude());

        if (store.getOwner() != null) {
            response.setOwnerId(store.getOwner().getId());
            response.setOwnerName(store.getOwner().getName());
        }

        int activeOfferCount = (int) store.getOffers()
                .stream()
                .filter(OfferService::isOfferActive)
                .count();
        response.setActiveOfferCount(activeOfferCount);
        return response;
    }
}
