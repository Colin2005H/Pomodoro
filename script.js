document.addEventListener('DOMContentLoaded', function() {
    let timerDisplay = document.getElementById('timer');
    let titleDisplay = document.getElementById('title');
    let startButton = document.getElementById('startButton');
    let clearButton = document.getElementById('clearButton');
    let showButton = document.getElementById('showButton');
    let configuration = document.getElementById('configuration');
    let controls = document.getElementById('controls');
    var startSound = new Audio("Sounds/StartSound.mp3");
    var endSound = new Audio("Sounds/endSound.mp3");
    let countdown; 
    let totalSecondes; // Temps restant pour le minuteur principal
    let isPaused = true; //marche ou pause
    let isWorkPhase = true; // Savoir si c'est la phase de travail ou de pause

    function changementTitre(newTitle) {
        let titleDisplay = document.getElementById('title');
        
        titleDisplay.classList.add('slide-out');
        
        setTimeout(function() {
            titleDisplay.textContent = newTitle; 
            
            
            titleDisplay.classList.remove('slide-out');
            titleDisplay.classList.add('slide-in');
            
            
            setTimeout(function() {
                titleDisplay.classList.remove('slide-in');
            }, 500); 
            
        }, 500); 
    }

    // Fonction pour un affichage clair
    function formatTime(minutes, secondes) {
        return String(minutes).padStart(2, '0') + ":" + String(secondes).padStart(2, '0');
    }

    // Fonction pour démarrer le timer de pause
    function timerPause() {
        changementTitre("Pause");
        let timer = document.getElementById('timer');
        timer.style.animation = "borderAnimationEnd 2s ease-in-out forwards";
        
        
        let minutesPauseInput = parseInt(document.getElementById('minutesPause').value) || 0;
        let secondesPauseInput = parseInt(document.getElementById('secondesPause').value) || 0;
        
        totalSecondes = (minutesPauseInput * 60) + secondesPauseInput;
        if (totalSecondes == 0) {
            totalSecondes = (5 * 60); // 5 minutes par défaut pour la pause
        }
        timerDisplay.textContent = formatTime(Math.floor(totalSecondes / 60), totalSecondes % 60);

        countdown = setInterval(function() {
            if (totalSecondes <= 0) {
                clearInterval(countdown);
                timerDisplay.textContent = "Fin de la pause !";
                titleDisplay.textContent = "Pomodoro";
                startButton.textContent = "Démarrer"; 
                let timer = document.getElementById('timer');
                timer.style.animation = "none";
                totalSecondes = null; // réinitialiser le temps restant
                isWorkPhase = true; // revenir à la phase de travail
                startTimer(); // Redémarrer le timer de travail après la pause
            } else {
                totalSecondes--;

                let minutesRestantes = Math.floor(totalSecondes / 60);
                let secondesRestantes = totalSecondes % 60;

                // Mettre à jour l'affichage
                timerDisplay.textContent = formatTime(minutesRestantes, secondesRestantes);
            }
        }, 1000);
    }

    // Fonction pour démarrer le timer de travail
    function startWorkTimer() {
        startSound.play();
        changementTitre("Phase de travail");
        let timer = document.getElementById('timer');
        timer.style.animation = "borderAnimationStart 2s ease-in-out forwards";
        let minutesInput = parseInt(document.getElementById('minutes').value) || 0;
        let secondsInput = parseInt(document.getElementById('secondes').value) || 0;

        // Pour le premier démarrage
        if (!totalSecondes) {
            
            totalSecondes = (minutesInput * 60) + secondsInput;
            if (totalSecondes == 0) {
                totalSecondes = (25 * 60); // 25 minutes par défaut pour le travail
            }
        }

        // afficher la durée
        timerDisplay.textContent = formatTime(Math.floor(totalSecondes / 60), totalSecondes % 60);

        // démarrer le minuteur de travail
        countdown = setInterval(function() {
            if (totalSecondes <= 0) {
                clearInterval(countdown);
                endSound.play();
                timerPause(); // Lancer le timer de pause après la fin du travail
                isWorkPhase = false; // Marquer que la phase de travail est terminée
            } else {
                totalSecondes--;

                let minutesRestantes = Math.floor(totalSecondes / 60);
                let secondesRestantes = totalSecondes % 60;

                // afficher le nouveau temps restant
                timerDisplay.textContent = formatTime(minutesRestantes, secondesRestantes);
            }
        }, 1000);
    }

    //demarrage du timer de travail ou de pause en fonction de la situation
    function startTimer() {
        if (isWorkPhase) {
            startWorkTimer(); // Démarrer la phase de travail
        } else {
            timerPause(); // Démarrer la pause
        }
    }

    // Gestion du bouton démarrer/suspendre
    startButton.addEventListener('click', function() {
        if (isPaused) {
            let timer = document.getElementById('timer');
            timer.style.animation = "borderAnimationStart 2s ease-in-out forwards";
            startTimer();
            startButton.textContent = "Suspendre"; 
            isPaused = false; 
        } else {
            let timer = document.getElementById('timer');
            timer.style.animation = "borderAnimationEnd 2s ease-in-out forwards";
            clearInterval(countdown); 
            startButton.textContent = "Reprendre"; 
            isPaused = true; 
            
        }
    });

    // Gestion du bouton réinitialiser
    clearButton.addEventListener('click', function() {
        let timer = document.getElementById('timer');
        timer.style.animation = "borderAnimationEnd 2s ease-in-out forwards";
        changementTitre("Pomodoro");
        clearInterval(countdown); 
        totalSecondes = null;
        timerDisplay.textContent = "25:00"; 
        startButton.textContent = "Démarrer"; 
        document.getElementById('minutes').value = ''; 
        document.getElementById('secondes').value = ''; 
        isPaused = true; 
        isWorkPhase = true; // Réinitialiser à la phase de travail
    });

    // Gestion du bouton showButton pour afficher/masquer les sections
    showButton.addEventListener('click', function() {
        // Configuration du minuteur
        if (configuration.style.display === "none") {
            configuration.style.display = "flex"; 
        } else {
            configuration.style.display = "none";
        }

        // Titre
        if (titleDisplay.style.display === "none") {
            titleDisplay.style.display = "flex"; 
        } else {
            titleDisplay.style.display = "none";
        }

        // Timer et contrôles
        if (timerDisplay.style.display === "none") {
            timerDisplay.style.display = "flex";
            controls.style.display = "flex";
        } else {
            timerDisplay.style.display = "none";
            controls.style.display = "none";
        }

        let timer = document.getElementById('timer');
        let minutesInput = parseInt(document.getElementById('minutes').value) || 0;
        let secondsInput = parseInt(document.getElementById('secondes').value) || 0;
        totalSecondes = (minutesInput * 60) + secondsInput;
        timerDisplay.textContent = formatTime(Math.floor(totalSecondes / 60), totalSecondes % 60);
        startButton.textContent = "Démarrer"; 
        clearInterval(countdown); 
        totalSecondes = null;
        isPaused = true; 
        isWorkPhase = true;
        

    });
});
