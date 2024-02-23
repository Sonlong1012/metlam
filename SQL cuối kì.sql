create database csdl_SoilData;

use csdl_SoilData;
CREATE TABLE tbl_SoilData (
    id INT AUTO_INCREMENT PRIMARY KEY,
    soil_moisture varchar(100),
    relay_status varchar(100),
    do_am_dat varchar(100),
    humidity varchar(100),
    temperature varchar(100)
);

INSERT INTO tbl_SoilData (soil_moisture, relay_status, do_am_dat, humidity, temperature) VALUES (40, 'off', 20, 23.7, 30);
INSERT INTO tbl_SoilData (soil_moisture, relay_status, do_am_dat, humidity, temperature) VALUES (40, 'off', 20, 23.7, 30);

select *from tbl_SoilData