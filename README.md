# Movie App

The Movie app is a simple clone of IMDB app. The app is  listing on the home page 100 movies and 100 tv shows. On home page is a toggle button with which we can switch between movies and th shows. Each movie is displayed as a movie card with cover, title and average rating. When user click on the card it will redirect to the movie details page. On the movie details page user can see title, cover, cast and description of the selected movie. Under te cover are star for rate the movie. The movie can only rate a register user. On the home page is also a search bar. User can search movie with a movie title or by movie actors.
A search bar also understand phrases like 'after 2015', '5 stars', 'nineties', '90`s', 'eighties', '80`s'. 'older then 5 years', 'At least 3 stars', 'More then 4 stars'. The user can also sign up with a Google Account.

### TODO:
1. Sign up with FaceBook account
2. Allow user only one time to rate a movie. Each next time, if user already have rated the movie, in movie details page will display users rating.
3. Add category for movies and tv shows
4. Add filter bar for filtering movies by category, year, actors, etc.
5. Add more phrases.
6. Make app look more user friendly.
7. Seed more movies and tv shows in MongoDB

### Tehnologies

Built with :

*Backend:
  - JS
  - Node
  - Mongo
  - JWT
  - Express
  - Mongoose
  - bcrypto
  - dotenv

*Frontend:
  - React
  - Redux
  - Redux-Thunk
  - React Router Dom
  - React Icons
  - Styled Componenets
  - JS
  - HTML
  - CSS

**Seeding mongodb**: You can seed tv shows and movies your mongoDB:
  - go to server/dbSeed folder in terminal
  - run *node movieSeed.js* to seed movies in your mongoDB 
  - run *node tvShowsSeed.js* to seed tv shows in your mongoDB 
  
**.env**: Create you .env file in /server folder with( optional: if you want to run the app on other MongoDB and PORT, also creating token with different jwt secret):
  - PORT 
  - MONGO
  - JWT_SECRET

## Clone App 

  - To get a local copy up and running follow these simple example steps:
  - Clone the repo: git clone https://github.com/eldanka/movie_app  in terminal
 - Go to /server folder in terminal
  - Install NPM packages: npm install
  - Start the project: **npm run dev**
  - Backend will run on port 5000
  - Go to /client folder in terminal
  - Install NPM packages: npm install
  - Start the project: **npm start** 
  - Frontend will run on port 3000