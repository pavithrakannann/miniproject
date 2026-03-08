package com.example.discount.location.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.discount.location.service.LocationService;

@RestController
@RequestMapping("/location")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/route")
    public String getShortestRoute(
            @RequestParam double userLat,
            @RequestParam double userLng,
            @RequestParam double storeLat,
            @RequestParam double storeLng
    ) {

        return locationService.getRoute(userLat, userLng, storeLat, storeLng);
    }
}