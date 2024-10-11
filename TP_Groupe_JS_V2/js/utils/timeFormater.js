// timeFormatter.js

// Fonction pour obtenir l'heure actuelle formatée
export function getFormattedCurrentTime() {
    const currentDate = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Pour le format 24 heures
    };

    return currentDate.toLocaleTimeString('fr-FR', options); // Utilise 'fr-FR' pour le format français
}

// Vérification avec un console.log pour vérifier que ça fonctionne bien !
// console.log("Heure actuelle :", getFormattedCurrentTime());
