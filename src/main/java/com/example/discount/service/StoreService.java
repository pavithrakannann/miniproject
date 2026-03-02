package com.example.discount.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.discount.entity.Store;
import com.example.discount.repository.StoreRepository;

@Service
public class StoreService {

    private final StoreRepository repo;
    private final GeocodingService geoService;

    // Constructor Injection
    public StoreService(StoreRepository repo,
                        GeocodingService geoService) {

        this.repo = repo;
        this.geoService = geoService;
    }

    // ✅ Save store with automatic latitude and longitude
    public Store saveStore(Store store) {

        try {

            // Validate input
            if (store.getName() == null ||
                store.getCategory() == null ||
                store.getAddress() == null ||
                store.getAddress().isEmpty()) {

                throw new RuntimeException(
                        "Store name, category, and address are required");
            }

            // Call Geocoding API
            double[] coords =
                    geoService.getLatLng(
                            store.getAddress());

            if (coords == null) {

                throw new RuntimeException(
                        "Unable to fetch latitude and longitude from address");

            }

            // Set coordinates
            store.setLatitude(coords[0]);
            store.setLongitude(coords[1]);

            // Save to database
            return repo.save(store);

        }
        catch (Exception e) {

            e.printStackTrace();

            throw new RuntimeException(
                    "Error saving store: " + e.getMessage());

        }

    }

    // ✅ Get all stores (useful for nearest store feature later)
    public List<Store> getAllStores() {

        return repo.findAll();

    }

    // ✅ Get store by ID
    public Store getStoreById(Long id) {

        return repo.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Store not found"));

    }

}