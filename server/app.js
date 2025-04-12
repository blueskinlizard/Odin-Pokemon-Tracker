const express = require('express');
const app = express();
const PORT = 8080;

const loginRoutes = require('./routes/login'); 
const pokemonRoutes = require('./routes/pokemonBackend')

app.use(express.json()); 

app.use("/api", loginRoutes);
app.use("/api", pokemonRoutes);

app.use(session({
  secret: process.env.SECRET_PASSWORD,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get("/", (req, res) =>{
    res.send("Hello World!");
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
