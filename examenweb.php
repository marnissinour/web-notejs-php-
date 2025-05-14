<?php

// Connexion à la base de données
$connexion = new PDO('mysql:host=localhost;dbname=sncft;', 'root', '');

// Récupération des données depuis le formulaire
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$sexe = $_POST['sexe'];
$nbr_billets = (int) $_POST['nbr_billet'];  // Corrigé : utiliser $_POST['nbr_billet'] pour correspondre à la variable.

// Vérification de la catégorie en fonction du nombre de billets
if ($nbr_billets > 150) {
    $categorie = 'Gold';
} elseif ($nbr_billets > 50) {
    $categorie = 'Silver';
} else {
    $categorie = 'White';
}

// Insertion des données dans la table 'client'
$requete1 = $connexion->prepare('INSERT INTO client (nom, prenom, sexe, nbr_billets, categorie) VALUES(:nom, :prenom, :sexe, :nbr_billets, :categorie)');
$requete1->execute([
    ':nom' => $nom,
    ':prenom' => $prenom,
    ':sexe' => $sexe,
    ':nbr_billets' => $nbr_billets,
    ':categorie' => $categorie
]);

// Récupération des clients de catégorie 'Gold'
$requete2 = $connexion->prepare('SELECT * FROM client WHERE categorie = "Gold"');
$requete2->execute();  // Exécution de la requête préparée.

// Affichage des clients de catégorie 'Gold'
while ($client = $requete2->fetch(PDO::FETCH_ASSOC)) { // Récupération des données de chaque client
    echo "Nom: " . $client['nom'] . "<br>";
    echo "Prénom: " . $client['prenom'] . "<br>";
    echo "Sexe: " . $client['sexe'] . "<br>";
    echo "Nombre de billets: " . $client['nbr_billets'] . "<br>";
    echo "Catégorie: " . $client['categorie'] . "<br><br>";
}

// Déconnexion de la base de données
$connexion = null;

?>
