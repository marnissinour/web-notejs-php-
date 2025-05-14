//----------------Code de base pour un serveur avec Express------------------

// 1. Importation des modules
const express = require('express'); // module express

// 2. Création de l'application
const app = express();



// 4. Middleware pour parser le JSON
app.use(express.json()); 

// 5. Définir une route GET
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Express !'); // message de bienvenue
});


const PORT = 3000;
// 6. Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});











//----------------Créer et importer un module personnalisé----------------

function direBonjour(nom) {
  return `Bonjour, ${nom} !`;
}

// Exporter la fonction
module.exports = {
  direBonjour
};







//----------------Utiliser le module personnalisé dans un autre fichier----------------

const express = require('express');
const { direBonjour } = require('./utils'); // Importation de module personnalisé

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/bonjour/:nom', (req, res) => {
  const nom = req.params.nom; // Récupérer le nom depuis les paramètres de l'URL
  
  res.send(direBonjour(nom));  // Utiliser la fonction du module personnalisé
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});

















//----------------Créer un serveur avec des routes----------------

// 1. Importer Express
const express = require('express');
const app = express();
// 2. Définir un port
const PORT = 3000;
// 3. Middleware pour parser le JSON
app.use(express.json());
// 4. Définir une route GET
app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Express !');
});


// 5. Définir une route POST
app.post('/users', (req, res) =>
    const user = req.body; // récupérer le corps de la requête
    res.status(201).json({ // envoyer une réponse JSON (200, 201,203)
        message: 'Utilisateur créé avec succès',  // message de succès
        user: user // renvoyer l'utilisateur créé
    });
);
// 6. Démarrer le serveur
app.listen(PORT, () =>
    console.log(`Serveur en écoute sur http://localhost:${PORT}`);

);   


// 7. Définir une route PUT
app.put('/users/:id', (req, res) => {
  const id = req.params.id; 
  const user = req.body;
  res.json({
    message: `Utilisateur avec l'ID ${id} mis à jour avec succès`,
    user: user
  });
});
// 8. Définir une route DELETE
app.delete('/users/:id', (req, res) =>
    const id = req.params.id;
res.status(204).json({ 
    message: `Utilisateur avec l'ID ${id} supprimé avec succès`
    }); 
);  


















//----------------Créer un serveur avec des routes et des middlewares----------------
//exemple d'exercice

// index.js



const express = require('express'); // module express
const app = express(); // création de l'application
const PORT = 3000; // port du serveur
// Configurer le moteur de vues EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware pour le JSON
app.use(express.json()); // parser le JSON
app.use(express.urlencoded({ extended: true })); // parser les données URL

// Route principale
app.get('/', (req, res) => {
  res.render('home'); // rend home.ejs
});
//localhost:3000/hello/Alice
// Route Hello avec nom dynamique
app.get('/hello/:name', (req, res) => {
  const { name } = req.params; // récupérer le nom
  res.render('hello', { name }); // rend hello.ejs
});


const { add } = require('./utils/math'); // module personnalisé de math
const { multiply } = require('./utils/math'); // module personnalisé de math
//ou 
const { add , multiply } = require('./utils/math');


// Addition : formulaire GET → résultat
app.get(' /add', (req, res) => {

    // récupérer les valeurs du formulaire a et b et les convertir en nombres
  const a = parseFloat(req.query.a); 
  const b = parseFloat(req.query.b);

  const result = add(a, b); // utiliser la fonction d'addition
  res.render('result', { operation: 'Addition', a, b, result }); // rend result.ejs
});

// Multiplication : formulaire POST → résultat
app.post('/multiply', (req, res) => {
  const { a, b } = req.body;  // récupérer les valeurs du formulaire
  const result = multiply(parseFloat(a), parseFloat(b)); // convertir les strings en nombres
  res.render('result', { operation: 'Multiplication', a, b, result }); // rend result.ejs
  
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur rendu EJS sur http://localhost:${PORT}`);
});

//-------------------views/hello.ejs------------------

<!DOCTYPE html>
<html>
<head>
  <title>Salutation</title>
</head>
<body>
  <h1>Bonjour, <%= name %> !</h1> // interpolation de la variable name 
  <a href="/">Retour</a>
</body>
</html>

//-------------------utils/math.js------------------

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply }; // exporter les fonctions add et multiply



//-------------------views/home.ejs------------------

<!DOCTYPE html>
<html>
<head>
  <title>Accueil</title>
</head>
<body>
  <h1>Bienvenue sur le serveur EJS !</h1>

  <h2>Addition (GET)</h2>
  <form method="get" action="/add">
    <input type="number" name="a" required>
    +
    <input type="number" name="b" required>
    <button type="submit">Calculer</button>
  </form>

  <h2>Multiplication (POST)</h2>
  <form method="post" action="/multiply">
    <input type="number" name="a" required>
    ×
    <input type="number" name="b" required>
    <button type="submit">Calculer</button>
  </form>

  <p><a href="/hello/Alice">Dire bonjour à Alice</a></p> // lien vers la route hello avec le nom Alice 
</body>
</html>







//-------------------views/result.ejs------------------

<!DOCTYPE html>
<html>
<head>
  <title>Résultat</title>
</head>
<body>
  <h1><%= operation %> :</h1>
  <p><%= a %> et <%= b %> donnent : <strong><%= result %></strong></p>   // interpolation des variables 
  <a href="/">Retour à l'accueil</a>
</body>
</html>
