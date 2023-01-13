# RDF_CSSE

Application créée pour le projet intensif au Dôme (Caen) avec l'ENSICAEN. Le projet porte sur la sobriété énergétique.
Cette application permet au citoyen français en 2050 de consulter leur Crédit Social Sportif et Energétique (CSSE). 
L'application permet aussi au citoyen de gagner des points en marchant (100 pas = 1 point). Un citoyen peut dénoncer les mauvais comportement de leur concitoyen. Cela fait ainsi perdre des points au citoyen dénoncé et gagner des points au citoyen dénonciateur si la requête est valider par le gouvernement. Pour en savoir plus : https://intensif06.ensicaen.fr/demo-renewable-energy.html 

## Installation

```
git clone https://gitlab.ecole.ensicaen.fr/carneiro/rdf_csse.git
npm install
```

Pour tester sur un serveur local
```
ionic serve
```

Pour simuler sur un appareil mobile (Android Studio nécessaire)
```
ionic capacitor add android
ionic capacitor copy android
ionic capacitor sync android
```
Puis ouvrir le dossier 'android' créé à la racine du projet dans Android Studio pour le simuler

## Fonctionnalités

- Connexion avec l'id et le mot de passe d'un citoyen
- Affichage du profil (nombre de pas, classement, CSSE)
- Consultation du classement
- Dénonciation d'un citoyen
- Géolocalisation du citoyen

## Outils & Technologies

- Ionic React
- Capacitor
