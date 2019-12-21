const test_movies = [
        {
          _id:1,
          title: "Terminator",
          genre: "Action",
          screen: 5,
          length: "2:15",
          screenings: [new Date(2018, 11, 24, 10, 33), new Date()],
        },
        {
          _id:2,
          title: "Die Hard",
          genre: "Action" ,
          screen: 3,
          length: "3:15",
          screenings: [new Date(), new Date(2018, 12, 24, 8, 30)],
        },
        {
          _id:3,
          title: "Get Out",
          genre: "Thriller",
          screen: 1,
          length: "1:45",
          screenings: [new Date(), new Date()],
        },
        {
          _id:4,
          title: "Trip to Italy",
          genre: "Comedy",
          screen: 6,
          length: "4:15",
          screenings: [new Date(), new Date()],
        },
        {
          _id:5,
          title: "Airplane",
          genre: "Comedy",
          screen: 8,
          length: "2:02",
          screenings: [new Date(), new Date()],
        },
        {
          _id:6,
          title: "Gone Girl",
          genre: "Thriller" ,
          screen: 2,
          length: "2:30",
          screenings: [new Date(), new Date()],
        },
        {
          _id:7,
          title: "The Avengers",
          genre: "Action" ,
          screen: 7,
          length: "3:15",
          screenings: [new Date() , new Date()],
        }
    ];

export function getMovies() {
  return test_movies;
}

export function saveMovie(movie) {
  let movieInDb = test_movies.find(m => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = movie.genre;
  movieInDb.length = movie.length;
  movieInDb.screen = movie.screen;
  movieInDb.screenings = movie.screenings;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    test_movies.push(movieInDb);
  }

  return movieInDb;
}