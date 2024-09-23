document.addEventListener('DOMContentLoaded', function() {
    let timerDisplay = document.getElementById('timer');
    let startButton = document.getElementById('startButton');
    let countdown; 
    let totalSecondes; // temps restant
    let isPaused = true; // Marche ou pause

    // Fonction pour un affichage clair
    function formatTime(minutes, secondes) {
        return String(minutes).padStart(2, '0') + ":" + String(secondes).padStart(2,'0');
    }




    startButton.addEventListener('click', function() {
        if (isPaused) {
            // Recuperrer les valeurs
            
            let minutesInput = parseInt(document.getElementById('minutes').value) ||0;
            let secondsInput = parseInt(document.getElementById('secondes').value) || 0;

            // Pour le premier demmarage
            if (!totalSecondes) {
                totalSecondes = (minutesInput * 60) + secondsInput;
                if(totalSecondes == 0){
                    totalSecondes = (25 * 60); // 25min par défaut
                }
            }

            // Afficher la durée
            timerDisplay.textContent = formatTime(Math.floor(totalSecondes/ 60), totalSecondes % 60);

            // Démmarer ou stopper le minuteur
            countdown = setInterval(function() {
                if (totalSecondes <=0) {
                    clearInterval(countdown);
                    timerDisplay.textContent = "Temps écoulé !";
                    startButton.textContent = "Démarrer"; 
                    totalSecondes = null; // Réinitialiser le temps restant
                    
                } else {
                    totalSecondes--;

                    
                    let minutesRestantes = Math.floor(totalSecondes/ 60);
                    let secondesRestantes = totalSecondes %60;

                    // Mettre à jour l'affichage
                    timerDisplay.textContent = formatTime(minutesRestantes,secondesRestantes);
                }
            },1000); // rafaraichir toutes les secondes

            startButton.textContent = "Pause"; // Changer le texte du bouton
            isPaused = false; 

        } else {
            
            clearInterval(countdown); 
            startButton.textContent = "Reprendre"; 
            isPaused = true; 
        }
    });
});
