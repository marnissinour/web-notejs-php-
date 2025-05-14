<?php

//etape 1 : connexion à la base de données
$connexion = new PDO('mysql:host=localhost;dbname=jeux_video;', 'root', ''); 

//..........................ajout..................

$nom=$_POST['nom'];
$console=$_POST['console'];
$prix=$_POST['prix'];

///etape 2 : préparation de la requête
$requete = $connexion->prepare('INSERT INTO table1 (nom, console, prix) VALUES(:nom, :console, :prix)');
//etape 2 : liaison des paramètres
$requete->execute([
    ':nom' => $nom,
    ':console' => $console,
    ':prix' => $prix
])


//.............................update..............


$nom=$_POST['nom'];
$console=$_POST['console'];
$prix=$_POST['prix'];

//update de la table jeux_video
$requete = $connexion->prepare('UPDATE table1 SET console = :console, prix = :prix WHERE nom = :nom');
$requete->execute ([
    ':nom' => $nom,
    ':console' => $console,
    ':prix' => $prix
]);

//...............supression..................
$nom=$_POST['nom'];

//supression de la table jeux_video
$requete = $connexion->prepare('DELETE * FROM table1 WHERE nom = :nom');
$requete->execute([
    ':nom' => $nom
]);


//...............affichage..................

$nom=$_POST['nom'];

$requete = $connexion->prepare('SELECT * FROM table1 where nom = :nom');
$requete->execute([':nom' => $nom]); 


while ($jeu = $requete->fetch(PDO::FETCH_ASSOC)) { // Récupération des données de chaque jeu

    echo "Nom: " . $jeu['nom'] . "<br>";
    echo "Console: " . $jeu['console'] . "<br>";
    echo "Prix: " . $jeu['prix'] . " <br><br>";
}

//fermeture de la connexion
$connexion = null;





?>
