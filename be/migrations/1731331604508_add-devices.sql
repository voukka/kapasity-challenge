-- Up Migration
INSERT INTO devices
    (device_id, location_name, latitude, longitude)
VALUES
    ('thing-1', 'Maittenraja, 03100 Nummela', '60.3242261', '24.2851357'),
    ('thing-2', 'Vanha yhdystie 5, 04430 Järvenpää', '60.4725529', '25.1099573')
;


-- Down Migration
DELETE FROM devices;
