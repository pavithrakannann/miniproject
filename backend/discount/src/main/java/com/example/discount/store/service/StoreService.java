// package com.example.discount.store.service;

// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.example.discount.store.entity.Store;
// import com.example.discount.store.repository.StoreRepository;

// @Service
// public class StoreService {

//     private final StoreRepository repo;
//     private final GeocodingService geoService;

//     // Constructor Injection
//     public StoreService(StoreRepository repo,
//                         GeocodingService geoService) {

//         this.repo = repo;
//         this.geoService = geoService;
//     }

//     // ✅ Save store with automatic latitude and longitude
//     public Store saveStore(Store store) {

//         try {

//             // Validate input
//             if (store.getName() == null ||
//                 store.getCategory() == null ||
//                 store.getAddress() == null ||
//                 store.getAddress().isEmpty()) {

//                 throw new RuntimeException(
//                         "Store name, category, and address are required");
//             }

//             // Call Geocoding API
//             double[] coords =
//                     geoService.getLatLng(
//                             store.getAddress());

//             if (coords == null) {

//                 throw new RuntimeException(
//                         "Unable to fetch latitude and longitude from address");

//             }

//             // Set coordinates
//             store.setLatitude(coords[0]);
//             store.setLongitude(coords[1]);

//             // Save to database
//             return repo.save(store);

//         }
//         catch (Exception e) {

//             e.printStackTrace();

//             throw new RuntimeException(
//                     "Error saving store: " + e.getMessage());

//         }

//     }
//     public Store updateStore(Long id, Store updatedStore) {

//     Store existingStore = repo.findById(id)
//             .orElseThrow(() -> new RuntimeException("Store not found"));

//     existingStore.setName(updatedStore.getName());
//     existingStore.setCategory(updatedStore.getCategory());
//     existingStore.setAddress(updatedStore.getAddress());

//     // Re-fetch latitude & longitude if address changed
//     double[] coords = geoService.getLatLng(updatedStore.getAddress());

//     if (coords != null) {
//         existingStore.setLatitude(coords[0]);
//         existingStore.setLongitude(coords[1]);
//     }

//     return repo.save(existingStore);
// }

//     // ✅ Get all stores (useful for nearest store feature later)
//     public List<Store> getAllStores() {

//         return repo.findAll();

//     }

//     // ✅ Get store by ID
//     public Store getStoreById(Long id) {

//         return repo.findById(id)
//                 .orElseThrow(() ->
//                         new RuntimeException("Store not found"));

//     }
//     public void deleteStore(Long id) {

//     if (!repo.existsById(id)) {
//         throw new RuntimeException("Store not found");
//     }

//     repo.deleteById(id);
// }

// }

// package com.example.discount.store.service;

// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.example.discount.store.entity.Store;
// import com.example.discount.store.repository.StoreRepository;
// import com.example.discount.user.entity.User;
// import com.example.discount.user.repository.UserRepository;

// @Service
// public class StoreService {

//     private final StoreRepository repo;
//     private final GeocodingService geoService;
//     private final UserRepository userRepository;

//     public StoreService(StoreRepository repo,
//                         GeocodingService geoService,
//                         UserRepository userRepository) {

//         this.repo = repo;
//         this.geoService = geoService;
//         this.userRepository = userRepository;
//     }

//     // ✅ SAVE STORE WITH OWNER
//     public Store saveStoreWithUser(Store store, Long userId) {

//         try {

//             // 🔥 Get user
//             User user = userRepository.findById(userId)
//                     .orElseThrow(() -> new RuntimeException("User not found"));

//             // 🔥 FIXED HERE
//             store.setOwner(user);

//             // Validation
//             if (store.getName() == null ||
//                 store.getCategory() == null ||
//                 store.getAddress() == null ||
//                 store.getAddress().isEmpty()) {

//                 throw new RuntimeException(
//                         "Store name, category, and address are required");
//             }

//             // Geocoding
//             double[] coords = geoService.getLatLng(store.getAddress());

//             if (coords == null) {
//                 throw new RuntimeException("Unable to fetch coordinates");
//             }

//             store.setLatitude(coords[0]);
//             store.setLongitude(coords[1]);

//             return repo.save(store);

//         } catch (Exception e) {
//             e.printStackTrace();
//             throw new RuntimeException("Error saving store: " + e.getMessage());
//         }
//     }

//     // ✅ GET STORES BY OWNER
//     public List<Store> getStoresByUserId(Long userId) {
//         return repo.findByOwnerId(userId); // 🔥 FIXED HERE
//     }

//     // ✅ GET ALL
//     public List<Store> getAllStores() {
//         return repo.findAll();
//     }

//     // ✅ GET BY ID
//     public Store getStoreById(Long id) {
//         return repo.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Store not found"));
//     }

//     // ✅ UPDATE
//     public Store updateStore(Long id, Store updatedStore) {

//         Store existingStore = repo.findById(id)
//                 .orElseThrow(() -> new RuntimeException("Store not found"));

//         existingStore.setName(updatedStore.getName());
//         existingStore.setCategory(updatedStore.getCategory());
//         existingStore.setAddress(updatedStore.getAddress());

//         double[] coords = geoService.getLatLng(updatedStore.getAddress());

//         if (coords != null) {
//             existingStore.setLatitude(coords[0]);
//             existingStore.setLongitude(coords[1]);
//         }

//         return repo.save(existingStore);
//     }

//     // ✅ DELETE
//     public void deleteStore(Long id) {

//         if (!repo.existsById(id)) {
//             throw new RuntimeException("Store not found");
//         }

//         repo.deleteById(id);
//     }
// }

package com.example.discount.store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.discount.store.entity.Store;
import com.example.discount.store.repository.StoreRepository;
import com.example.discount.user.entity.User;
import com.example.discount.user.repository.UserRepository;

@Service
public class StoreService {

    private final StoreRepository repo;
    private final GeocodingService geoService;
    private final UserRepository userRepository;

    public StoreService(StoreRepository repo,
                        GeocodingService geoService,
                        UserRepository userRepository) {

        this.repo = repo;
        this.geoService = geoService;
        this.userRepository = userRepository;
    }

    // ✅ SAVE STORE WITH OWNER
    public Store saveStoreWithUser(Store store, Long userId) {

        // 🔥 Get user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔥 Attach owner
        store.setOwner(user);

        // ✅ Validation
        if (store.getName() == null ||
            store.getCategory() == null ||
            store.getAddress() == null ||
            store.getAddress().isEmpty()) {

            throw new RuntimeException(
                    "Store name, category, and address are required");
        }

        // ✅ Geocoding (safe)
        try {
            double[] coords = geoService.getLatLng(store.getAddress());

            if (coords != null) {
                store.setLatitude(coords[0]);
                store.setLongitude(coords[1]);
            }

        } catch (Exception e) {
            System.out.println("Geocoding failed, saving without coordinates");
        }

        return repo.save(store);
    }

    // ✅ GET STORES BY OWNER
    public List<Store> getStoresByUserId(Long userId) {
        return repo.findByOwnerId(userId);
    }

    // ✅ GET ALL STORES
    public List<Store> getAllStores() {
        return repo.findAll();
    }

    // ✅ GET STORE BY ID
    public Store getStoreById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found"));
    }

    // ✅ UPDATE STORE
    public Store updateStore(Long id, Store updatedStore) {

        Store existingStore = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        existingStore.setName(updatedStore.getName());
        existingStore.setCategory(updatedStore.getCategory());
        existingStore.setAddress(updatedStore.getAddress());

        try {
            double[] coords = geoService.getLatLng(updatedStore.getAddress());

            if (coords != null) {
                existingStore.setLatitude(coords[0]);
                existingStore.setLongitude(coords[1]);
            }

        } catch (Exception e) {
            System.out.println("Geocoding update failed");
        }

        return repo.save(existingStore);
    }

    // ✅ DELETE STORE
    public void deleteStore(Long id) {

        if (!repo.existsById(id)) {
            throw new RuntimeException("Store not found");
        }

        repo.deleteById(id);
    }
}