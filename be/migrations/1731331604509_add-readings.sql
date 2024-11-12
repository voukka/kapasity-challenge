-- Up Migration
INSERT INTO readings
    (device_id, timestamp, fullness_level)
VALUES
('thing-1', '2024-11-11T14:48:00.000Z', 1),
('thing-1', '2024-11-11T14:55:00.000Z', 5),
('thing-1', '2024-11-11T15:48:00.000Z', 25),
('thing-1', '2024-11-12T15:48:00.000Z', 85),
('thing-2', '2024-11-11T14:48:00.000Z', 0),
('thing-2', '2024-11-11T14:55:00.000Z', 35),
('thing-2', '2024-11-11T17:48:00.000Z', 65)
;


-- Down Migration
DELETE FROM devices;
