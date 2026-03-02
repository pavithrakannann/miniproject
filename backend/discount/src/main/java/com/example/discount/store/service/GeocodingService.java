package com.example.discount.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeocodingService {

    // YOUR OPENCAGE API KEY
    private final String API_KEY =
            "de283b07b6214dcd9ad7000ef7899e7d";

    public double[] getLatLng(String address) {

        try {

            // Encode address properly
            String encodedAddress =
                    URLEncoder.encode(
                            address,
                            StandardCharsets.UTF_8);

            // OpenCage API URL
            String url =
                    "https://api.opencagedata.com/geocode/v1/json?q="
                            + encodedAddress
                            + "&key="
                            + API_KEY;

            RestTemplate restTemplate =
                    new RestTemplate();

            // Get response
            Map response =
                    restTemplate.getForObject(
                            url,
                            Map.class);

            if(response == null)
                return null;

            // Extract results
            List results =
                    (List) response.get("results");

            if(results == null || results.isEmpty())
                return null;

            Map first =
                    (Map) results.get(0);

            Map geometry =
                    (Map) first.get("geometry");

            double lat =
                    Double.parseDouble(
                            geometry.get("lat").toString());

            double lng =
                    Double.parseDouble(
                            geometry.get("lng").toString());

            return new double[]{lat,lng};

        }
        catch(Exception e){

            e.printStackTrace();

        }

        return null;

    }

}