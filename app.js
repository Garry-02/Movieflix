/*
 Authors:
 Your name and student #: Gurjyot Singh Mann, A01260638
 Your Partner's Name and student #:
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const { readFile } = require('fs').promises

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("myForm", (req, res) => {
  // Add your implementation here 
  const movieData = req.body['movies'];
  const formattedMovies = movieData.split(',');
  res.render('pages/index', {
    placeholder: formattedMovies,
  });
});

app.get("/myListQueryString", (req, res) => {
  // Add your implementation here
  res.render('pages/index', {
    placeholder: [req.query['movie1'], req.query['movie2']],
  });
});

app.get("/search/:movieName", (req, res) => {
  // Add your implementation here
  const movieName = req.params.movieName; 
  readFile('movieDescriptions.txt', 'utf-8')
    .then((data) => {
      for (line of data.split('\n')) 
        if (movieName == (line.split(':')[0])) { 
          res.render('pages/searchResult', {
            movie: movieName,
            description: line.split(':')[1]
          })
        } // render the page with the result 
      res.render('pages/searchResult', {
        movie: 'Error',
        description: 'Movie could not be found.'
      })
    }) // render page with movie not found
    .catch((err) => console.log(err)) // Console log the error 
});

app.listen(3002, () => {
  console.log("Server is running on port 3002 🚀");
});