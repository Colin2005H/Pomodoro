document.addEventListener('DOMContentLoaded', function() {
    let timerDisplay = document.getElementById('timer');
    let titleDisplay = document.getElementById('title');
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
        titleDisplay.textContent = "Pause";
        titleDisplay.classList.add('highlight');
        setTimeout(function() {
            titleDisplay.classList.remove('highlight');
        }, 2000); // 2000 ms 
        totalSecondes = 5*60; // 5 minutes de pause
        timerDisplay.textContent = formatTime(Math.floor(totalSecondes / 60), totalSecondes % 60);

        countdown = setInterval(function() {
            if (totalSecondes <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = "Fin de la pause !";
                titleDisplay.textContent = "Pomodoro";
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
        titleDisplay.textContent = "Phase de travail";

        setTimeout(function() {
            titleDisplay.classList.remove('highlight');
        }, 2000); // 2000 ms 
        if (isPaused) {
            // Récupérer les valeurs
            let minutesInput = parseInt(document.getElementById('minutes').value) || 0;
            let secondsInput = parseInt(document.getElementById('secondes').value) || 0;

            // Pour le premier démarrage
            if (!totalSecondes) {
                titleDisplay.classList.add('highlight');
                totalSecondes = (minutesInput * 60) + secondsInput;
                if (totalSecondes == 0) {
                    totalSecondes = (25 * 60); // 25min par défaut
                }
            }

            // afficher la durée
            timerDisplay.textContent = formatTime(Math.floor(totalSecondes / 60), totalSecondes % 60);

            //demarrer ou stopper le minuteur principal
            countdown = setInterval(function() {
                if (totalSecondes <= 0) {
                    clearInterval(countdown);
                    timerPause(); //Lancer le timer de pause de 5 minutes après la fin du premier
                    
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
        titleDisplay.textContent = "Pomodoro";
        clearInterval(countdown); 
        totalSecondes = null;
        timerDisplay.textContent = "25:00"; 
        startButton.textContent = "Démarrer"; 
        document.getElementById('minutes').value = ''; 
        document.getElementById('secondes').value = ''; 
        isPaused = true; 
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    let showButton = document.getElementById('showButton');
    let configuration = document.getElementById('configuration');

    showButton.addEventListener('click', function() {
        if (configuration.style.display === "none") {
            configuration.style.display = "flex"; 
        } else {
            configuration.style.display = "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let showButton = document.getElementById('showButton');
    let title = document.getElementById('title');

    showButton.addEventListener('click', function() {
        if (title.style.display === "none") {
            title.style.display = "flex"; 
        } else {
            title.style.display = "none";
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    let showButton = document.getElementById('showButton');
    let timer = document.getElementById('timer');
    let controls = document.getElementById('controls');

    showButton.addEventListener('click', function() {
        if (timer.style.display === "none") {
            timer.style.display = "flex";
            controls.style.display = "flex";

        } else {
            timer.style.display = "none";
            controls.style.display = "none";

        }
    });
});

