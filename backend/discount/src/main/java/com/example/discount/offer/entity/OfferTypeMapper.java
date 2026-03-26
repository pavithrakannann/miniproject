package com.example.discount.offer.entity;

public final class OfferTypeMapper {

    private OfferTypeMapper() {
    }

    public static OfferType toType(String rawType) {
        if (rawType == null || rawType.trim().isEmpty()) {
            throw new IllegalArgumentException("Offer type is missing");
        }

        String normalized = rawType.trim().toUpperCase();
        if ("PERCENTAGE".equals(normalized)) {
            return OfferType.PERCENTAGE;
        }
        if ("PRODUCT".equals(normalized)) {
            return OfferType.PRODUCT;
        }
        if ("PRODUCTS".equals(normalized)) {
            return OfferType.PRODUCT;
        }
        if ("COMBO".equals(normalized)) {
            return OfferType.COMBO;
        }
        if ("SERVICE".equals(normalized)) {
            return OfferType.SERVICE;
        }

        throw new IllegalArgumentException("Unsupported offer type: " + rawType);
    }

    public static String toDatabaseValue(String rawType) {
        return toType(rawType).name();
    }

    public static String toResponseValue(String rawType) {
        return toType(rawType).name();
    }
}
