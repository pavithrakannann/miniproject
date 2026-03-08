package com.example.discount.location.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LocationService {

    private final String API_KEY = "AIzaSyBKwwSOBlMGkBNziQ1nj2rC6MbIZjiEJKU";

    private final RestTemplate restTemplate = new RestTemplate();

    // Calculate distance using Google Directions API
    public String getRoute(double userLat, double userLng,
                           double storeLat, double storeLng) {

        String url = "https://maps.googleapis.com/maps/api/directions/json"
                + "?origin=" + userLat + "," + userLng
                + "&destination=" + storeLat + "," + storeLng
                + "&key=" + API_KEY;

        return restTemplate.getForObject(url, String.class);
    }

}