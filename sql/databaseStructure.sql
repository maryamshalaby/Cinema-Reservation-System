CREATE TABLE `cinema_reservation`.`users` ( 
    `username` VARCHAR(50) NOT NULL , 
    `password` VARCHAR(50) NOT NULL , 
    `first_name` VARCHAR(250) NOT NULL , 
    `last_name` VARCHAR(250) NOT NULL , 
    `birth_date` DATE NOT NULL , 
    `email` VARCHAR(250) NOT NULL UNIQUE , 
    `type` ENUM('admin','customer') NOT NULL ,
     PRIMARY KEY (`username`)) ENGINE = InnoDB;

CREATE TABLE `cinema_reservation`.`screen` ( 
    `screen_number` INT NOT NULL , 
    `rows`INT NOT NULL ,
    `columns`INT NOT NULL ,
    PRIMARY KEY (`screen_number`)) ENGINE = InnoDB;

CREATE TABLE `cinema_reservation`.`movies` ( 
    `movie_id`INT NOT NULL  AUTO_INCREMENT,
    `movie_name`  VARCHAR(250) NOT NULL , 
    `genre` VARCHAR(50) NOT NULL , 
    `screen`INT NOT NULL ,
    `length`INT NOT NULL ,
    PRIMARY KEY (`movie_id`)) ENGINE = InnoDB;

CREATE TABLE `cinema_reservation`.`movie_times` ( 
    `movie_id`INT NOT NULL ,
    `movie_time` DATETIME NOT NULL , 
    PRIMARY KEY (`movie_id`,`movie_time`)) ENGINE = InnoDB;

CREATE TABLE `cinema_reservation`.`reservations` ( 
    `screen` INT NOT NULL,
    `seat_row` INT NOT NULL ,
    `seat_col` INT NOT NULL ,
    PRIMARY KEY (`screen`,`seat_row`,`seat_col`)) ENGINE = InnoDB;

ALTER TABLE  `cinema_reservation`.`movie_times`
    ADD FOREIGN KEY (`movie_id`) REFERENCES `cinema_reservation`.`movies`(`movie_id`);
ALTER TABLE  `cinema_reservation`.`movies`
    ADD FOREIGN KEY (`screen`) REFERENCES `cinema_reservation`.`screen`(`screen_number`);
ALTER TABLE  `cinema_reservation`.`reservations`
    ADD FOREIGN KEY (`screen`) REFERENCES `cinema_reservation`.`screen`(`screen_number`);
    
    