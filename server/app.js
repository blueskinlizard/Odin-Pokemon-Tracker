require('dotenv').config();  // This must be at the top
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 8080;
const cors = require('cors');

const loginRoutes = require('./routes/login'); 
const pokemonRoutes = require('./routes/pokemonBackend');

app.use(cors({
  origin: 'http://localhost:5173',  // Adjust this to match your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // If you need cookies or authorization headers to be included
}));

app.use(express.json());

// Ensure session middleware comes before routes
app.use(session({
  secret: process.env.SESSION_SECRET,  // Ensure this uses the correct env variable
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use("/api", loginRoutes);
app.use("/api", pokemonRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
