INSERT INTO `screen`(`screen_number`, `rows`, `columns`) VALUES 
(1,5,5),
(2,6,6),
(3,10,10),
(4,10,10),
(5,5,5);

INSERT INTO `movies` (`movie_id`, `movie_name`, `genre`, `screen`, `length`) VALUES 
(NULL, 'The Lion King', 'Animation', 1, 180),
(NULL, 'The Lion King 2', 'Animation', 2, 100),
(NULL, 'The Lion King 1/2', 'Animation', 3, 100),
(NULL, 'Toy Story', 'Animation', 4, 110), 
(NULL, 'Toy Story 2', 'Animation', 5, 60);


INSERT INTO `movie_times` (`movie_id`, `movie_time`) VALUES 
(6, '2019-12-01 05:10:10'),
(6, '2019-12-02 05:10:10'),
(7, '2019-12-04 06:10:10'),
(8, '2019-12-05 07:10:10'),
(9, '2019-12-06 05:20:10'),
(10, '2019-12-07 08:10:10');

INSERT INTO `users`(`username`, `password`, `first_name`, `last_name`, `birth_date`, `email`, `type`) VALUES
('maryam','1','maryam','shalaby','1997-08-07','dummy@','admin'),
('customer','1','someone','something','1997-08-07','dumm1y@','customer');

INSERT INTO `reservations`(`screen`, `seat_row`, `seat_col`) VALUES 
(1,1,1),
(1,1,2),
(1,1,3),
(1,1,4),
(1,2,1),
(2,3,1),
(3,1,1),
(4,1,1),
(5,1,1);


