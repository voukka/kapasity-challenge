-- Up Migration

CREATE TABLE devices (
    device_id VARCHAR(50) PRIMARY KEY,
    location_name VARCHAR(100),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8)
);

CREATE TABLE readings (
    reading_id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) REFERENCES devices(device_id),
    timestamp TIMESTAMP,
    fullness_level INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Down Migration
DROP TABLE readings;
DROP TABLE devices;
