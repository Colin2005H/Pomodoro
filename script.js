document.addEventListener("DOMContentLoaded", function () {
  let timerDisplay = document.getElementById("timer");
  let titleDisplay = document.getElementById("title");
  let startButton = document.getElementById("startButton");
  let showButton = document.getElementById("showButton");
  let configuration = document.getElementById("configuration");
  let controls = document.getElementById("controls");
  var startSound = new Audio("Sounds/StartSound.mp3");
  const chime = new Audio("Sounds/chime.mp3");

  let countdown;
  let totalSecondes = null;
  let isWorkPhase = true;

  // charger les valeurs de temps de l'utilisateur enregistées en local
  function loadFormValues() {
    const minutes = localStorage.getItem("minutes");
    const secondes = localStorage.getItem("secondes");
    const minutesPause = localStorage.getItem("minutesPause");
    const secondesPause = localStorage.getItem("secondesPause");

    if (minutes !== null) document.getElementById("minutes").value = minutes;
    if (secondes !== null) document.getElementById("secondes").value = secondes;
    if (minutesPause !== null)
      document.getElementById("minutesPause").value = minutesPause;
    if (secondesPause !== null)
      document.getElementById("secondesPause").value = secondesPause;
  }

  // enregistrer en local les valeurs saisies dans formulaire
  function saveFormValues() {
    const minutes = document.getElementById("minutes").value;
    const secondes = document.getElementById("secondes").value;
    const minutesPause = document.getElementById("minutesPause").value;
    const secondesPause = document.getElementById("secondesPause").value;

    localStorage.setItem("minutes", minutes);
    localStorage.setItem("secondes", secondes);
    localStorage.setItem("minutesPause", minutesPause);
    localStorage.setItem("secondesPause", secondesPause);
  }

  loadFormValues();

  // changer le texte du titre en fonction de la phase du timer
  function titleSwap(newTitle) {
    titleDisplay.classList.add("slide-out");
    setTimeout(function () {
      titleDisplay.textContent = newTitle;
      titleDisplay.classList.remove("slide-out");
      titleDisplay.classList.add("slide-in");
      setTimeout(function () {
        titleDisplay.classList.remove("slide-in");
      }, 500);
    }, 500);
  }

  function formatTime(minutes, secondes) {
    return (
      String(minutes).padStart(2, "0") + ":" + String(secondes).padStart(2, "0")
    );
  }

  // gestion du minuteur de pause
  function timerPause() {
    let minutesPauseInput =
      parseInt(document.getElementById("minutesPause").value) || 0;
    let secondesPauseInput =
      parseInt(document.getElementById("secondesPause").value) || 0;
    chime.play();
    totalSecondes = minutesPauseInput * 60 + secondesPauseInput;
    if (totalSecondes == 0) {
      totalSecondes = 5 * 60;
    }
    timerDisplay.textContent = formatTime(
      Math.floor(totalSecondes / 60),
      totalSecondes % 60
    );

    countdown = setInterval(function () {
      if (totalSecondes <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "Fin de la pause !";
        titleSwap("Pomodoro");
        totalSecondes = null;
        isWorkPhase = true;
        startTimer();
      } else {
        totalSecondes--;
        let minutesRestantes = Math.floor(totalSecondes / 60);
        let secondesRestantes = totalSecondes % 60;
        timerDisplay.textContent = formatTime(
          minutesRestantes,
          secondesRestantes
        );
      }
    }, 1000);
  }
  // gestion du minuteur de travail
  function startWorkTimer() {
    startSound.play();
    titleSwap("Phase de travail");
    let minutesInput = parseInt(document.getElementById("minutes").value) || 0;
    let secondsInput = parseInt(document.getElementById("secondes").value) || 0;

    if (totalSecondes === null) {
      totalSecondes = minutesInput * 60 + secondsInput;

      if (totalSecondes == 0) {
        totalSecondes = 25 * 60;
      }
    }

    timerDisplay.style.animation =
      "borderAnimationStart 2s ease-in-out forwards";

    timerDisplay.textContent = formatTime(
      Math.floor(totalSecondes / 60),
      totalSecondes % 60
    );

    countdown = setInterval(function () {
      if (totalSecondes <= 0) {
        clearInterval(countdown);
        timerPause();
        isWorkPhase = false;

        titleSwap("Pause");
      } else {
        totalSecondes--;
        let minutesRestantes = Math.floor(totalSecondes / 60);
        let secondesRestantes = totalSecondes % 60;
        timerDisplay.textContent = formatTime(
          minutesRestantes,
          secondesRestantes
        );
      }
    }, 1000);
  }
  // gestion du changement entre le minuteur de travail et de pause
  function startTimer() {
    if (isWorkPhase) {
      startWorkTimer();
    } else {
      timerPause();
    }
  }
  // bouton pour lancer ou réinitialiser le minuteur
  startButton.addEventListener("click", function () {
    if (totalSecondes === null) {
      startTimer();
      startButton.textContent = "Réinitialiser";
    } else {
      titleSwap("Pomodoro");
      clearInterval(countdown);
      totalSecondes = null;
      startButton.textContent = "Lancer";
      document.getElementById("minutes").value = "";
      document.getElementById("secondes").value = "";
      isWorkPhase = true;

      timerDisplay.style.animation =
        "borderAnimationEnd 2s ease-in-out forwards";
    }
  });

  // affichage du menu de configuration
  showButton.addEventListener("click", function () {
    loadFormValues();
    let minutesInput = parseInt(document.getElementById("minutes").value) || 0;
    let secondsInput = parseInt(document.getElementById("secondes").value) || 0;
    let minutesPauseInput =
      parseInt(document.getElementById("minutesPause").value) || 0;
    let secondesPauseInput =
      parseInt(document.getElementById("secondesPause").value) || 0;

    let totalSecondesPause = minutesPauseInput * 60 + secondesPauseInput;
    totalSecondes = minutesInput * 60 + secondsInput;
    if (totalSecondes > 7200) {
      alert("Entrez un temps de travail inférieur à 2H");
    } else if (totalSecondesPause > 3600) {
      alert("Entrez un temps de pause inférieur à 1H");
    } else {
      configuration.style.display =
        configuration.style.display === "none" ? "flex" : "none";
      titleDisplay.style.display =
        titleDisplay.style.display === "none" ? "flex" : "none";
      timerDisplay.style.display =
        timerDisplay.style.display === "none" ? "flex" : "none";
      controls.style.display =
        controls.style.display === "none" ? "flex" : "none";
      timerDisplay.textContent = formatTime(
        Math.floor(totalSecondes / 60),
        totalSecondes % 60
      );
      startButton.textContent = "Lancer";
      clearInterval(countdown);
      totalSecondes = null;
      isWorkPhase = true;
    }
  });

  // mettre à jour les données entrées dans le formulaire à chaque modification
  document.getElementById("minutes").addEventListener("input", saveFormValues);
  document.getElementById("secondes").addEventListener("input", saveFormValues);
  document
    .getElementById("minutesPause")
    .addEventListener("input", saveFormValues);
  document
    .getElementById("secondesPause")
    .addEventListener("input", saveFormValues);
});
