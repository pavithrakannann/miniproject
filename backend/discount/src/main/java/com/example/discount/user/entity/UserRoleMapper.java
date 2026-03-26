package com.example.discount.user.entity;

public final class UserRoleMapper {

    private UserRoleMapper() {
    }

    public static UserRole toRole(String rawRole) {
        if (rawRole == null || rawRole.trim().isEmpty()) {
            throw new IllegalArgumentException("Account role is missing");
        }

        String normalized = rawRole.trim().toUpperCase();
        if ("OWNER".equals(normalized) || "STOREOWNER".equals(normalized) || "STORE_OWNER".equals(normalized)) {
            return UserRole.STORE_OWNER;
        }

        if ("USER".equals(normalized)) {
            return UserRole.USER;
        }

        throw new IllegalArgumentException("Unsupported account role: " + rawRole);
    }

    public static String toDatabaseValue(String rawRole) {
        return toRole(rawRole).name();
    }

    public static String toResponseValue(String rawRole) {
        return toRole(rawRole).name();
    }
}
