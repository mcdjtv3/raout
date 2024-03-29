let shotsTaken = 0;
let timeLeft = 5; // Temps en secondes
let playerName = ""; // Variable pour stocker le nom du joueur

const timerElement = document.getElementById('time-left');
const shotsTakenElement = document.getElementById('shots-taken');
const drinkButton = document.getElementById('drink-button');
const resultPopup = document.getElementById('result-popup');
const finalScore = document.getElementById('final-score');
const retryButton = document.getElementById('retry-button');
const sendScoreButton = document.getElementById('send-score-button');
const playerNameInput = document.getElementById('player-name-input');

drinkButton.addEventListener('click', () => {
    shotsTaken++;
    shotsTakenElement.innerText = shotsTaken;
    animateCharacter();
});

const countdown = setInterval(() => {
    if (timeLeft > 0) {
        timeLeft--;
        timerElement.innerText = timeLeft;
    } else {
        clearInterval(countdown);
        drinkButton.disabled = true;
        showResult();
    }
}, 1000);

function animateCharacter() {
    const glass = document.getElementById('glass-animation');
    glass.classList.remove('animate-glass'); // Supprimer la classe d'animation
    void glass.offsetWidth; // Déclencher une reprise pour redémarrer l'animation
    glass.classList.add('animate-glass'); // Ajouter la classe d'animation pour déclencher l'animation
}

function showResult() {
    finalScore.innerText = shotsTaken;
    resultPopup.classList.remove('hidden');
}

retryButton.addEventListener('click', () => {
    window.location.reload();
});

sendScoreButton.addEventListener('click', () => {
    playerName = playerNameInput.value.trim(); // Récupérer le nom du joueur et supprimer les espaces vides
    if (playerName !== "") {
        sendScoreToSheet(playerName, shotsTaken);
    } else {
        alert("Veuillez entrer votre nom avant d'envoyer le score.");
    }
});

function sendScoreToSheet(playerName, score) {
  var data = {
    playerName: playerName,
    score: score
  };
  fetch('https://script.google.com/macros/s/AKfycbx5kij35uvEEj8npmQuIioscVpzksgsIcWnGE2Ey9_h19Jg-oz1CCJNVkOELJxAn2E-/exec', {
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(data)
  }).then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}


