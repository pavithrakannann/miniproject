// package com.example.discount.offer.service;

// import java.util.List;

// import org.springframework.stereotype.Service;

// import com.example.discount.offer.entity.Offer;
// import com.example.discount.offer.repository.OfferRepository;
// import com.example.discount.store.entity.Store;
// import com.example.discount.store.repository.StoreRepository;

// @Service
// public class OfferService {

//     private final OfferRepository offerRepo;
//     private final StoreRepository storeRepo;

//     public OfferService(OfferRepository offerRepo,
//                         StoreRepository storeRepo) {

//         this.offerRepo = offerRepo;
//         this.storeRepo = storeRepo;
//     }

//     // ✅ ADD OFFER
//     public Offer addOffer(Long storeId, Offer offer) {

//         Store store = storeRepo.findById(storeId)
//                 .orElseThrow(() -> new RuntimeException("Store not found"));

//         offer.setStore(store);

//         return offerRepo.save(offer);
//     }

//     // ✅ GET OFFERS BY STORE
//     public List<Offer> getOffersByStore(Long storeId) {
//         return offerRepo.findByStoreId(storeId);
//     }

//     // ✅ DELETE OFFER
//     public void deleteOffer(Long id) {
//         offerRepo.deleteById(id);
//     }
// }

package com.example.discount.offer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.discount.offer.entity.Offer;
import com.example.discount.offer.repository.OfferRepository;
import com.example.discount.store.entity.Store;
import com.example.discount.store.repository.StoreRepository;

@Service
public class OfferService {

    private final OfferRepository offerRepo;
    private final StoreRepository storeRepo;

    public OfferService(OfferRepository offerRepo,
                        StoreRepository storeRepo) {

        this.offerRepo = offerRepo;
        this.storeRepo = storeRepo;
    }

    // ✅ ADD OFFER
    public Offer addOffer(Long storeId, Offer offer) {

        Store store = storeRepo.findById(storeId)
                .orElseThrow(() -> new RuntimeException("Store not found"));

        offer.setStore(store);

        return offerRepo.save(offer);
    }

    // ✅ GET OFFERS BY STORE (FIXED 🔥)
    public List<Offer> getOffersByStore(Long storeId) {
        return offerRepo.findByStore_Id(storeId);  // ✅ FIX
    }

    // ✅ DELETE OFFER
    public void deleteOffer(Long id) {
        offerRepo.deleteById(id);
    }
}