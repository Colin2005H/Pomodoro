document.addEventListener('DOMContentLoaded', function() {
    let timerDisplay = document.getElementById('timer');
    let startButton = document.getElementById('startButton');
    let clearButton = document.getElementById('clearButton');
    let countdown; 
    let totalSecondes; // Temps restant pour le minuteur principal
    let isPaused = true; // Marche ou pause
    let audio = new Audio(".mp3");

    // Fonction pour un affichage clair
    function formatTime(minutes, secondes) {
        return String(minutes).padStart(2, '0') + ":" + String(secondes).padStart(2, '0');
    }

    // Fonction pour démarrer le timer de pause
    function timerPause() {
        totalSecondes = 5 * 60; // 5 minutes de pause
        timerDisplay.textContent = formatTime(Math.floor(totalSecondes / 60), totalSecondes % 60);

        countdown = setInterval(function() {
            if (totalSecondes <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = "Fin de la pause !";
                startButton.textContent = "Démarrer"; 
                totalSecondes = null; // reinitialiser le temps restant
            } else {
                totalSecondes--;

                let minutesRestantes = Math.floor(totalSecondes / 60);
                let secondesRestantes = totalSecondes % 60;

                // Mettre à jour l'affichage
                timerDisplay.textContent = formatTime(minutesRestantes, secondesRestantes);
            }
        }, 1000);
    }
    // gestion du bouton demarrer
    startButton.addEventListener('click', function() {
        if (isPaused) {
            // Récupérer les valeurs
            let minutesInput = parseInt(document.getElementById('minutes').value) || 0;
            let secondsInput = parseInt(document.getElementById('secondes').value) || 0;

            // Pour le premier démarrage
            if (!totalSecondes) {
                totalSecondes = (minutesInput * 60) + secondsInput;
                if (totalSecondes == 0) {
                    totalSecondes = (25 * 60); // 25min par défaut
                }
            }

            // afficher la durée
            timerDisplay.textContent = formatTime(Math.floor(totalSecondes / 60), totalSecondes % 60);

            // Démarrer ou stopper le minuteur principal
            countdown = setInterval(function() {
                if (totalSecondes <= 0) {
                    clearInterval(countdown);
                    timerDisplay.textContent = "Temps écoulé !";
                    timerPause(); // Lancer le timer de pause de 5 minutes après la fin du premier
                } else {
                    totalSecondes--;

                    let minutesRestantes = Math.floor(totalSecondes / 60);
                    let secondesRestantes = totalSecondes % 60;

                    // afficher le nouveau temps restant
                    timerDisplay.textContent = formatTime(minutesRestantes, secondesRestantes);
                }
            }, 1000);

            startButton.textContent = "Pause"; 
            isPaused = false; 

        } else {
            
            clearInterval(countdown); 
            startButton.textContent = "Reprendre"; 
            isPaused = true; 
        }
    });

    // bouton reinitialiser
    clearButton.addEventListener('click', function() {
        clearInterval(countdown); 
        totalSecondes = null;
        timerDisplay.textContent = "25:00"; 
        startButton.textContent = "Démarrer"; 
        document.getElementById('minutes').value = ''; 
        document.getElementById('secondes').value = ''; 
        isPaused = true; 
    });
});
