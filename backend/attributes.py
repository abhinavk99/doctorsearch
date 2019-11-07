SEARCH_ATTRIBUTES = {
    "cities": [
        "country",
        "country_code",
        "elevation_meters",
        "latitude",
        "longitude",
        "name",
        "population",
        "region",
        "region_code",
        "timezone",
    ],
    "doctors": [
        "address_city",
        "bio",
        "college",
        "degree",
        "gender",
        "insurance_plans",
        "latitude",
        "longitude",
        "name",
        "phone",
        "rating",
        "state",
        "street",
        "title",
        "zip_code",
    ],
    "specialties": ["category", "description", "name"],
}

SERIALIZE_ATTRIBUTES = {
    "cities": ["id", *SEARCH_ATTRIBUTES["cities"]],
    "doctors": ["id", "name", "bio", "title", "address_city"],
    "specialties": ["id", *SEARCH_ATTRIBUTES["specialties"]],
}

