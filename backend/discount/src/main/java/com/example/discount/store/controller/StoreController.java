// package com.example.discount.store.controller;

// import java.util.List;

// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.discount.store.entity.Store;
// import com.example.discount.store.service.StoreService;

// @RestController
// @RequestMapping("/api/store")
// @CrossOrigin(origins = "http://localhost:3000")
// public class StoreController {

//     private final StoreService service;

//     public StoreController(StoreService service){
//         this.service = service;
//     }

//     @PostMapping("/add")

//     public Store addStore(
//             @RequestBody Store store){

//         return service.saveStore(store);

//     }
//     @GetMapping("/all")
// public List<Store> getAllStores() {
//     return service.getAllStores();
// }
// @GetMapping("/{id}")
// public Store getStoreById(@PathVariable Long id) {
//     return service.getStoreById(id);
// }
// @PutMapping("/{id}")
// public Store updateStore(@PathVariable Long id,
//                          @RequestBody Store store) {
//     return service.updateStore(id, store);
// }
// @DeleteMapping("/{id}")
// public String deleteStore(@PathVariable Long id) {
//     service.deleteStore(id);
//     return "Store deleted successfully";
// }

// }

// package com.example.discount.store.controller;

// import com.example.discount.store.entity.Store;
// import com.example.discount.store.service.StoreService;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/store")
// @CrossOrigin(origins = "http://localhost:3000")
// public class StoreController {

//     private final StoreService service;

//     public StoreController(StoreService service) {
//         this.service = service;
//     }

//     // ✅ ADD STORE WITH USER (VERY IMPORTANT FIX)
//     @PostMapping("/add")
//     public Store addStore(
//             @RequestParam Long userId,   // 🔥 who is adding store
//             @RequestBody Store store) {

//         return service.saveStoreWithUser(store, userId);
//     }

//     // ✅ GET ALL STORES
//     @GetMapping("/all")
//     public List<Store> getAllStores() {
//         return service.getAllStores();
//     }

//     // ✅ GET STORE BY ID
//     @GetMapping("/{id}")
//     public Store getStoreById(@PathVariable Long id) {
//         return service.getStoreById(id);
//     }

//     // ✅ GET STORES BY USER (🔥 VERY IMPORTANT FOR DASHBOARD)
//     @GetMapping("/user/{userId}")
//     public List<Store> getStoresByUser(@PathVariable Long userId) {
//         return service.getStoresByUserId(userId);
//     }

//     // ✅ UPDATE STORE
//     @PutMapping("/{id}")
//     public Store updateStore(@PathVariable Long id,
//                              @RequestBody Store store) {
//         return service.updateStore(id, store);
//     }

//     // ✅ DELETE STORE
//     @DeleteMapping("/{id}")
//     public String deleteStore(@PathVariable Long id) {
//         service.deleteStore(id);
//         return "Store deleted successfully";
//     }
// }


package com.example.discount.store.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.store.entity.Store;
import com.example.discount.store.service.StoreService;

@RestController
@RequestMapping("/api/store")
@CrossOrigin(origins = "http://localhost:3000")
public class StoreController {

    private final StoreService service;

    public StoreController(StoreService service) {
        this.service = service;
    }

    // ✅ ADD STORE WITH OWNER (CORRECTED)
    @PostMapping("/add/{userId}")
    public Store addStore(
            @PathVariable Long userId,
            @RequestBody Store store) {

        return service.saveStoreWithUser(store, userId);
    }

    // ✅ GET ALL STORES
    @GetMapping("/all")
    public List<Store> getAllStores() {
        return service.getAllStores();
    }

    // ✅ GET STORE BY ID
    @GetMapping("/{id}")
    public Store getStoreById(@PathVariable Long id) {
        return service.getStoreById(id);
    }

    // ✅ GET STORES BY OWNER
    @GetMapping("/user/{userId}")
    public List<Store> getStoresByUser(@PathVariable Long userId) {
        return service.getStoresByUserId(userId);
    }

    // ✅ UPDATE STORE
    @PutMapping("/{id}")
    public Store updateStore(@PathVariable Long id,
                             @RequestBody Store store) {
        return service.updateStore(id, store);
    }

    // ✅ DELETE STORE
    @DeleteMapping("/{id}")
    public String deleteStore(@PathVariable Long id) {
        service.deleteStore(id);
        return "Store deleted successfully";
    }
}