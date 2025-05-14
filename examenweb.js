const express = require('express'); 
const app = express(); 
const PORT = 8080;
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello !'); 
});

app.use((req, res, next) => { // Middleware pour afficher un message avant chaque requête
    console.log("Loading request, please wait..."); 
    next();
});

app.get("/catalogue.html", (req, res) => {
    res.sendFile(path.join(__dirname, "catalogue.html")); // Envoi du fichier catalogue.html
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute `);
});

